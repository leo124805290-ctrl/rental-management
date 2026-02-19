import modelRouter from '../../lib/modelRouter'
import cache from '../../lib/cache'
import usageLogger from '../../lib/usageLogger'

async function callModel(baseUrl, apiKey, payload) {
  const r = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
    // keep the same timeout behavior as before; integrations can override
    timeout: 15000
  })
  const body = await r.json().catch(() => null)
  return { ok: r.ok, status: r.status, body }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { content } = req.body
  if (!content) return res.status(400).json({ error: 'no content' })

  const fingerprint = modelRouter.fingerprint(content)
  const cached = await cache.get(fingerprint)
  if (cached) {
    usageLogger.log({ fingerprint, cached: true, model: cached.model, tokens: cached.usage })
    return res.json({ content: cached.response, cached: true })
  }

  const route = modelRouter.route({ content })
  const baseUrl = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com'
  const apiKey = process.env.DEEPSEEK_API_KEY
  const payload = {
    model: route.model,
    messages: [{ role: 'user', content }],
    max_tokens: route.max_tokens
  }

  // 1) 先嘗試主要模型
  let result = null
  try {
    const primary = await callModel(baseUrl, apiKey, payload)
    if (primary.ok && primary.body) {
      result = { source: 'primary', responseBody: primary.body, model: route.model }
    } else {
      // 記錄 primary 錯誤資訊
      result = { source: 'primary_error', responseBody: primary.body, status: primary.status }
    }
  } catch (e) {
    result = { source: 'primary_exception', error: String(e) }
  }

  // 2) 若 primary 失敗，依使用者要求不使用備援模型，直接回錯
  if (!result || result.source !== 'primary') {
    // 不使用備援模型，直接回報錯誤並記錄
    usageLogger.log({ fingerprint, cached: false, model: route.model, error: result })
    return res.status(502).json({ error: 'primary_model_failed_no_fallback', details: result })
  }

  // 3) primary 成功的正常回傳流程
  const body = result.responseBody
  const resp = (body.choices && body.choices[0] && (body.choices[0].message?.content || body.choices[0].message?.reasoning_content || '')) || ''
  const usage = body.usage || {}

  usageLogger.log({ fingerprint, cached: false, model: route.model, tokens: usage })
  // cache result for future
  await cache.set(fingerprint, { response: resp, model: route.model, usage }, 60 * 60 * 24)

  res.json({ content: resp, usage, model: route.model })
}
