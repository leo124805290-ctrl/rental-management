import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'data', 'usage.json')
try { fs.mkdirSync(path.dirname(FILE), { recursive: true }) } catch (e) {}
if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, '[]')

function log(entry) {
  const data = JSON.parse(fs.readFileSync(FILE, 'utf8'))
  data.push({ ts: Date.now(), ...entry })
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}

export default { log }
