import {
    gdrive
} from 'btch-downloader';

export default {
    id: ['gdrive', 'googledrive'],
    run: async ({
        client,
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply(`Example: .${command} (link)`)

        const res = await gdrive(args[0])
        const recode = global.nodelete
        
        await client.sendFile(m.chat, res.result.data.downloadUrl, res.result.data.filename, mess.done);
    }
}