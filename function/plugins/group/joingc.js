export default {
    id: 'joingc',
    owner: true,
    run: async ({
        client,
        m,
        args,
        text
    }) => {
        if (!args[0] || !args[0].includes('whatsapp.com'))
            return m.reply('*Link Invalid, try something else*');

        try {
            const response = await client.groupAcceptInvite(link);
            m.reply(`*Successfully joining the group:* ${response}`);
        } catch (e) {
            console.log(e);
            m.reply(`*Failed to join group:* ${e.message || e}`);
        }
    }
}