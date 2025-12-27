import fs from 'fs'

export default {
    id: 'welcome',
    group: true,
    owner: true,
    run: async ({
        client,
        m,
        command,
        text
    }) => {
        const isWelcome = global.db.data.chats[m.chat].group_participants

        if (text == "on") {
            if (isWelcome) return m.reply(mess.fitur.on)
            global.db.data.chats[m.chat].group_participants = true
            m.reply('*Successfully activated welcome in this group*')
        } else if (text == "off") {
            if (!isWelcome) return m.reply(mess.fitur.off)
            global.db.data.chats[m.chat].group_participants = false
            m.reply('*Successfully deactivated welcome in this group*')
        } else {
            m.reply(mess.fitur.on_off)
        }
    }
}