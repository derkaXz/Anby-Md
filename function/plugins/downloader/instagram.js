import {
    igdl
} from 'btch-downloader';

export default {
    id: ['igdl', 'instagram'],
    run: async ({
        client,
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply(`Example: .${command} (link)`)

        try {
            const res = await igdl(args[0])
            const recode = global.nodelete
            await client.sendFile(m.chat, res.result[0].url, "igdkkbct", mess.done);
        } catch {
            m.reply("Just take a screenshot man..")
        }
    }
}