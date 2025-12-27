import {
    twitter
} from 'btch-downloader';

export default {
    id: ['twitter', 'X'],
    run: async ({
        client,
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply(`Example: .${command} (link)`)

        try {
            const res = await twitter(args[0])
            const recode = global.nodelete
            await client.sendFile(m.chat, res.url[0].hd, "igdkkbct", res.title);
        } catch {
            m.reply("Just take a screenshot man..")
        }
    }
}