import {
    quote
} from '../../scraper/trend.js'

export default {
    id: 'qc',
    run: async ({
        client,
        m,
        username,
        text,
        quoted,
        mime,
        command
    }) => {
        if (!text) return m.reply(`Example: .${command} (something)`)
        if (text.length > 30) return m.reply('Maximum 30 Texts!')

        const ppnyauser = await await client.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
        const rest = await quote(text, username, ppnyauser)

        client.sendImageAsSticker(m.chat, rest.result, m, {
            packname: `${global.packname}`,
            author: `${global.author}`
        })
    }
}