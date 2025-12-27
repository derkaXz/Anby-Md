export default {
  id: ['dellppgc', 'setppgc'],
  group: true,
  admin: true,
  botadmin: true,

  run: async ({ client, m, command }) => {
    try {
      if (command === 'dellppgc') {
        await client.updateProfilePicture(m.chat, null)
        return m.reply(mess.done)
      }

      const msg = m.quoted || m
      const mime = msg.mimetype || msg.msg?.mimetype || ''

   /*   if (!/image/.test(mime)) {
        return m.reply(`Kirim / reply gambar dengan caption ${command}`)
      }

      const buffer = await msg.download()
      if (!buffer) throw 'Gagal download gambar'

      await client.updateProfilePicture(m.chat, buffer)
      await m.reply(mess.done)*/

    } catch (err) {
      m.reply(mess.error)
    }
  }
}
