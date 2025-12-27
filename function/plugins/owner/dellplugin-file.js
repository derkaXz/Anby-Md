import fs from 'fs'
import path from 'path'

export default {
  id: ['delplugin', 'delfile'],
  owner: true,
  run: async ({ m, args, command }) => {
    if (!args[0]) return m.reply('Example: .delplugin <path | name>')

    const projectRoot = process.cwd()
    const input = args[0].replace(".js", '')

    let targetFile = null
    let currentDir
    
    if (command == "delplugin") {
    currentDir = path.join(projectRoot, 'function/plugins')
    } else {
    currentDir = path.join(projectRoot)
    }
  
    if (input.includes('/') || input.endsWith('.js')) {
      const resolved = path.resolve(currentDir, input)

      if (!resolved.startsWith(projectRoot)) {
        return m.reply('Path exit from project (rejected)')
      }

      if (!fs.existsSync(resolved)) {
        return m.reply('File not found')
      }

      targetFile = resolved
    }
   
    else {
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

      if (!results.length) return m.reply('File not found')
      if (results.length > 1) {
        return m.reply(
          'Found more than one file:\n' +
          results.map(f => path.relative(projectRoot, f)).join('\n')
        )
      }

      targetFile = results[0]
    }

    fs.unlinkSync(targetFile)

    m.reply(
      `✓ Files deleted:\n` +
      path.relative(projectRoot, targetFile)
    )
  }
}
