import crypto from 'crypto'

// 預設模型設為 deepseek-chat，reasoner 為 on-demand，備援模型為 gpt-5-mini
const DEFAULT_MODEL = process.env.DEFAULT_MODEL || 'deepseek-chat'
const REASONER_MODEL = process.env.REASONER_MODEL || 'deepseek-reasoner'
const BACKUP_MODEL = process.env.BACKUP_MODEL || 'gpt-5-mini'

function fingerprint(content) {
  return crypto.createHash('sha256').update(content).digest('hex')
}

function simpleIntentDetect(content) {
  // 超級簡單的意圖判斷：若包含關鍵字 "理由" "分析" "解釋" 則視為需要 reasoning
  const keywords = ['理由', '分析', '解釋', '推理', '證明', '詳細']
  for (const k of keywords) if (content.includes(k)) return 'reasoning'
  return 'chat'
}

function route({ content }) {
  const intent = simpleIntentDetect(content)
  if (intent === 'reasoning') {
    return { model: REASONER_MODEL, max_tokens: parseInt(process.env.MAX_TOKENS_REASONER || '2048') }
  }
  return { model: DEFAULT_MODEL, max_tokens: parseInt(process.env.MAX_TOKENS_DEFAULT || '512') }
}

function getBackupModel() {
  return BACKUP_MODEL
}

export default { fingerprint, route, getBackupModel }
