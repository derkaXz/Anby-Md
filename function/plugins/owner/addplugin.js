import fs from 'fs'
import path from 'path'

export default {
    id: ['addplugin'],
    owner: true,
    run: async ({
        m,
        args
    }) => {
        if (!args || !args[0]) {
            return m.reply('Example:\n.addplugin <path/file.js>\\n<code>')
        }

        const fileInput = args[0]
        const text = m.text.split('\n').slice(1).join('\n')

        if (!text) return m.reply('where is the code?')

        const projectRoot = process.cwd()
        const currentDir = path.join(
            projectRoot,
            'function/plugins'
        )

        const filePath = path.resolve(currentDir, fileInput)

        if (!filePath.startsWith(projectRoot)) {
            return m.reply('You path exit from project (rejected)')
        }
        l
        if (!filePath.endsWith('.js')) {
            return m.reply('The file must have the extension .js')
        }

        fs.mkdirSync(path.dirname(filePath), {
            recursive: true
        })

        if (fs.existsSync(filePath)) {
            return m.reply('The file already exists')
        }

        fs.writeFileSync(filePath, text)

        m.reply(
            `✓ Plugin added successfully\n` +
            `>> ${path.relative(projectRoot, filePath)}`
        )
    }
}