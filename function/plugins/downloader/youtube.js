import {
    youtube
} from 'btch-downloader'

export default {
    id: ['ytmp3', 'ytmp4', 'youtube', 'yt'],
    run: async ({
        client,
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply(`Example: .${command} (link)`)

        const data = await youtube(args[0])
        const recode = global.nodelete
        
        client.sendMessage(m.chat, {
            video: {
                url: data.mp4
            },
            caption: data.title,
            fileName: `youtube.mp4`,
            mimetype: 'video/mp4'
        }).then(() => {
            client.sendMessage(m.chat, {
                audio: {
                    url: data.mp3
                },
                fileName: `youtube.mp3`,
                mimetype: 'audio/mp4'
            })
        })
    }
}