import fs from 'fs'
import path from 'path'

const __dirname = new URL('.', import.meta.url).pathname

export default {
    id: ['editplugin', 'editfile'],
    owner: true,
    run: async ({
        m,
        args,
        command
    }) => {
        if (args.length < 2)
            return m.reply(
                `Example:\n.${command} <path|name> <overwrite|append>\n(code)`
            )

        const [input, mode] = args
        const root = path.resolve(__dirname, '../../../')

        let file = null

        if (input.includes('/') || input.startsWith('.')) {
            file = path.resolve(root, input)
            if (!file.startsWith(root)) return m.reply('Cant edit out of root folder')
            if (!fs.existsSync(file)) return m.reply('File not found')
        } else {
            const target = input.endsWith('.js') ? input : `${input}.js`
            const found = []

            const scan = d => {
                for (const f of fs.readdirSync(d)) {
                    if (f === 'node_modules') continue

                    const full = path.join(d, f)
                    const s = fs.statSync(full)

                    if (s.isDirectory()) scan(full)
                    else if (f === target) found.push(full)
                }
            }

            scan(root)

            if (!found.length) return m.reply('File not found')
            if (found.length > 1) {
                return m.reply(
                    'Found more than one file:\n' +
                    found.map(f => path.relative(root, f)).join('\n')
                )
            }

            file = found[0]
        }

        const content = m.text.split('\n').slice(1).join('\n')
        if (!content) return m.reply('where is the code?')

        if (mode === 'overwrite') fs.writeFileSync(file, content)
        else if (mode === 'append') fs.appendFileSync(file, '\n' + content)
        else return m.reply('Wrong mode')

        m.reply(`✓ ${mode} Succes\n>> ${path.relative(root, file)}`)
    }
}