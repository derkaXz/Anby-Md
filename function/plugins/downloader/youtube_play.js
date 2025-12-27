import {
    yts,
    youtube
} from 'btch-downloader';

export default {
    id: ['play', 'ytplay'],
    run: async ({
        client,
        m,
        username,
        runtime,
        userdb,
        text,
        command
    }) => {
        if (!text) return m.reply(`Example: .${command} (something)`)

        const query = await yts(text)
        const searchInfo = query.result.all[0]
        const url = searchInfo.url
        const data = await youtube(url)

        await client.sendMessage(m.chat, {
            audio: {
                url: data.mp3
            },
            mimetype: 'audio/mp4',
            fileName: randomTesk + '.mp3',
            contextInfo: {
                externalAdReply: {
                    title: searchInfo.title,
                    body: searchInfo.ago,
                    thumbnailUrl: searchInfo.image,
                    sourceUrl: url,
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        });
    }
}