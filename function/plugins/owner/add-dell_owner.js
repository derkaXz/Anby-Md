export default {
    id: ['addowner', 'delowner'],
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
        if (command === 'addowner') {
            global.db.data.users[target].Owner = true
            global.db.data.users[target].Premium = true
        } else {
            global.db.data.users[target].Owner = false
            global.db.data.users[target].Premium = false
        }

        m.reply(mess.succes)
    }
}