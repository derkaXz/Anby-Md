import {
    douyin
} from 'btch-downloader';

export default {
    id: 'douyin',
    run: async ({
        client,
        m,
        args,
        command
    }) => {
        if (!args[0]) return m.reply(`Example: .${command} (link)`)

        const res = await douyin(args[0])

        await client.sendFile(m.chat, res.result.data.links[0].url, "igdkkbct", res.result.data.title);
    }
}