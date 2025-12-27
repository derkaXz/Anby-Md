export default {
    id: ['autoread'],
    owner: true,
    run: async ({
        m,
        text
    }) => {
        if (!text) return m.reply(`Example: ${command} on/off`)
        
        if (text === 'on') {
            if (client.autoread) return m.reply(mess.off)
            client.autoread = true
            m.reply(`*Successfully changed autoread to ${text}*`)
        } else if (text === 'off') {
            if (!client.autoread) return m.reply(mess.off)
            client.autoread = false
            m.reply(`*Successfully changed autoread to ${text}*`)
        } else {
            m.reply(`*Example: ${command} on/off*`)
        }
    }
}