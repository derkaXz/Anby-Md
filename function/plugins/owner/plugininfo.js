import fs from 'fs'
import path from 'path'
import {
    formatSize
} from '../../myfunc.js'

export default {
    id: ['plugininfo'],
    owner: true,
    run: async ({
        m,
        args
    }) => {
        if (!args[0]) return m.reply('Example: .plugininfo <path|name>')

        const root = process.cwd()
        const base = path.join(root, 'function/plugins')
        const input = args[0].replace(".js", '')

        let file

        if (input.includes('/') || input.endsWith('.js')) {
            file = path.resolve(base, input)
            if (!file.startsWith(root)) return m.reply('Path rejected')
        } else {
            const found = []
            const scan = d => {
                for (const f of fs.readdirSync(d)) {
                    if (f === 'node_modules') continue
                    const full = path.join(d, f)
                    const s = fs.statSync(full)
                    if (s.isDirectory()) scan(full)
                    else if (f === `${input}.js`) found.push(full)
                }
            }
            scan(root)
            if (!found.length) return m.reply('File not found')
            file = found[0]
        }

        if (!fs.existsSync(file)) return m.reply('File not found')

        const stat = fs.statSync(file)
        const lines = fs.readFileSync(file, 'utf8').split('\n').length

        m.reply(
            `${path.relative(root, file)}\n` +
            `Size: ${formatSize(stat.size)}\n` +
            `Lines: ${lines}\n` +
            `Modified: ${stat.mtime}`
        )
    }
}