export default {
    id: ['addprem', 'delprem'],
    owner: true,
    run: async ({
        m,
        command
    }) => {
        if (!m.quoted && m.mentionedJid.length === 0)
            return m.reply(`*Reply pesan atau tag @user*`)

        const target =
            m.quoted?.sender ||
            m.mentionedJid[0]

        if (!target) return

        console.log(target)
        if (command === 'addprem') {
            global.db.data.users[target].Premium = true
        } else {
            global.db.data.users[target].Premium = false
        }

        m.reply(mess.succes)
    }
}