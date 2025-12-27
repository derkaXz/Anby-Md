import '../handler.js'
import '../global.js'
import fs from 'fs'
import path from 'path'
import { initSocket } from './socket.js'

const temp = path.join(process.cwd(), 'data', 'trash')

if (!fs.existsSync(temp)) {
  fs.mkdirSync(temp, { recursive: true })
}

const files = fs.readdirSync(temp)
const developer = fs.readFileSync('./sc_by_derkaXz.png')

for (const file of files) {
  fs.unlinkSync(path.join(temp, file))
}

await initSocket()
