import {
    spotify
} from 'btch-downloader';

export default {
    id: 'spotifydl',
    run: async ({
        client,
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply(`Example: .${command} (link)`)

        const res = await spotify(args[0])
        const recode = global.nodelete
        
        await client.sendImage(m.chat, res.result.thumbnail, res.result.title)
        await client.sendMessage(m.chat, {
            audio: {
                url: res.result.formats[0].url
            },
            fileName: `kvygfc-spotify.mp3`,
            mimetype: 'audio/mp4'
        })
    }
}