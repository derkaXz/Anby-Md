export default {
    id: ['leavegc', 'leave'],
    owner: true,
    run: async ({
        client,
        m,
        command,
        text
    }) => {
        await m.reply("then im leavin..")
        await client.groupLeave(m.chat)
    }
}