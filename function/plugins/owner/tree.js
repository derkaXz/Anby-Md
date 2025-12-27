import fs from 'fs'
import path from 'path'

const __dirname = new URL('.', import.meta.url).pathname
const ROOT = path.resolve(__dirname, '../../../')

export default {
    id: ['tree'],
    owner: true,
    run: async ({
        m
    }) => {
        const ignoreDirs = ['node_modules', 'session']
        const pluginDirs = ['plugins', 'function/plugins']

        const lines = []

        const walk = (dir, prefix = '') => {
            const items = fs.readdirSync(dir, {
                    withFileTypes: true
                })
                .filter(i => !ignoreDirs.includes(i.name))

            items.forEach((item, i) => {
                const isLast = i === items.length - 1
                const pointer = isLast ? '└─ ' : '├─ '
                const full = path.join(dir, item.name)
                const rel = path.relative(ROOT, full)

                lines.push(prefix + pointer + item.name)

                if (
                    item.isDirectory() &&
                    !pluginDirs.includes(rel.replace(/\\/g, '/'))
                ) {
                    walk(
                        full,
                        prefix + (isLast ? '   ' : '│  ')
                    )
                }
            })
        }

        lines.push(path.basename(ROOT) + '/')
        walk(ROOT)

        m.reply(
            '```' +
            lines.join('\n') +
            '```'
        )
    }
}