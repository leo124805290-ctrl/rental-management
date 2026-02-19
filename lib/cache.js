import Redis from 'ioredis'

const redisUrl = process.env.REDIS_URL
let client = null
if (redisUrl) client = new Redis(redisUrl)

async function get(key) {
  if (client) {
    const v = await client.get(key)
    return v ? JSON.parse(v) : null
  }
  // fallback in-memory simple cache
  if (!global.__CACHE) global.__CACHE = new Map()
  const item = global.__CACHE.get(key)
  if (!item) return null
  if (item.expire < Date.now()) { global.__CACHE.delete(key); return null }
  return item.value
}

async function set(key, value, ttlSec = 3600) {
  if (client) {
    await client.set(key, JSON.stringify(value), 'EX', ttlSec)
    return
  }
  if (!global.__CACHE) global.__CACHE = new Map()
  global.__CACHE.set(key, { value, expire: Date.now() + ttlSec * 1000 })
}

export default { get, set }
