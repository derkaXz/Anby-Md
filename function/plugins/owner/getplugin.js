import fs from 'fs'
import path from 'path'

export default {
    id: ['getplugin', 'getfile'],
    owner: true,
    run: async ({
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply('Example:\n.getplugin <path | name>')

        const projectRoot = process.cwd()
        const input = args[0].replace(".js", '')

        let currentDir
        let targetFile = null

        if (command == "getplugin") {
            currentDir = path.join(projectRoot, 'function/plugins')
        } else {
            currentDir = path.join(projectRoot)
        }

        if (input.includes('/') || input.endsWith('.js')) {
            const resolved = path.resolve(currentDir, input)

            if (!resolved.startsWith(projectRoot)) {
                return m.reply('Project exit path (rejected)')
            }

            if (!fs.existsSync(resolved)) {
                return m.reply('File not found')
            }

            targetFile = resolved
        } else {
            const results = []
            const scan = dir => {
                for (const file of fs.readdirSync(dir)) {
                    const full = path.join(dir, file)
                    const stat = fs.statSync(full)

                    if (file === 'node_modules') continue

                    if (stat.isDirectory()) scan(full)
                    else if (file === `${input}.js`) results.push(full)
                }
            }

            scan(projectRoot)

            if (!results.length) return m.reply('Plugin or fie not found')
            if (results.length > 1) {
                return m.reply(
                    'Found more than one file:\n' +
                    results.map(f => path.relative(projectRoot, f)).join('\n')
                )
            }

            targetFile = results[0]
        }

        const code = fs.readFileSync(targetFile, 'utf8')
        m.reply(
            `>> ${path.relative(projectRoot, targetFile)}\n\n` +
            code
        )
    }
}