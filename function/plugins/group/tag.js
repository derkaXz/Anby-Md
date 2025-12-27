export default {
    id: ['tagall', 'hidetag'],
    group: true,
    run: async ({
        client,
        m,
        command,
        text
    }) => {
        const metadata = await client.groupMetadata(m.chat);
        const members = metadata.participants.map(p => p.id);

        if (command == "tagall") {
            client.sendMessage(m.chat, {
                text: "@" + m.chat,
                contextInfo: {
                    groupMentions: [{
                        groupJid: m.chat,
                        groupSubject: 'everyone'
                    }],
                    mentionedJid: members
                }
            })
        } else {
            if (!text) return m.reply("Example: .hidetag derka was here")
            client.sendMessage(m.chat, {
                text: text,
                contextInfo: {
                    groupMentions: [{
                        groupJid: m.chat,
                        groupSubject: 'everyone'
                    }],
                    mentionedJid: members
                }
            })
        }
    }
}