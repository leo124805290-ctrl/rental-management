import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function send() {
    if (!input) return
    setLoading(true)
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input })
    })
    const data = await res.json()
    setMessages((m) => [...m, { role: 'user', content: input }, { role: 'assistant', content: data.content }])
    setInput('')
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>DeepSeek PoC Chat</h1>
      <div style={{ border: '1px solid #ddd', padding: 12, minHeight: 200 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '8px 0' }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <input style={{ width: '80%' }} value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={send} disabled={loading} style={{ marginLeft: 8 }}>{loading ? 'Sending...' : 'Send'}</button>
      </div>
    </div>
  )
}
