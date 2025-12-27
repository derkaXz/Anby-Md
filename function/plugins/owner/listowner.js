export default {
    id: ['totalowner', 'listowner'],
    owner: true,
    run: async ({
        m
    }) => {
        const total = Object.values(global.db.data.users)
            .filter(u => u.Owner)
            .length

        m.reply(`Total list Owner: ${total}`)
    }
}