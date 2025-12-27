export default {
    id: ['totalprem', 'listprem'],
    owner: true,
    run: async ({
        m
    }) => {
        const total = Object.values(global.db.data.users)
            .filter(u => u.Premium)
            .length

        m.reply(`Total user premium: ${total}`)
    }
}