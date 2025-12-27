import fs from 'fs'
import path from 'path'

export default {
    id: ['findplugin'],
    owner: true,
    run: async ({
        m,
        args
    }) => {
        if (!args[0]) return m.reply('What command do you want to find for?')

        const root = process.cwd()
        const results = []

        const scan = d => {
            for (const f of fs.readdirSync(d)) {
                if (f === 'node_modules') continue
                const full = path.join(d, f)
                const s = fs.statSync(full)
                if (s.isDirectory()) scan(full)
                else if (f.endsWith('.js')) {
                    const code = fs.readFileSync(full, 'utf8')
                    if (new RegExp(`id\\s*:\\s*\\[[^\\]]*['"\`]${args[0].replace(".", "")}['"\`]`).test(code))
                        results.push(full)
                }
            }
        }

        scan(root)
        if (!results.length) return m.reply('Not found')

        m.reply(results.map(f => path.relative(root, f)).join('\n'))
    }
}