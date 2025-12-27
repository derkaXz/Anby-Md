export default {
    id: ['del', 'delete'],
    botadmin: true,
    group: true,
    run: async ({
        client,
        m,
        command,
        text
    }) => {
        if (!m.quoted) return client.exreply(m.chat, '*Reply to messages you want to delete, like this!*')

        client.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                id: m.quoted.id,
                fromMe: m.quoted.fromMe,
                participant: m.quoted.sender
            }
        })
    }
}