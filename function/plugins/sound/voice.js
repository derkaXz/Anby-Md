import fs from "fs"
import {
    exec,
    spawn,
    execSync
} from "child_process"

export default {
    id: [
        'bass',
        'blown',
        'deep',
        'earrape',
        'fast',
        'fat',
        'nightcore',
        'reverse',
        'robot',
        'slow',
        'smooth',
        'tupai'
    ],
    run: async ({
        client,
        m,
        quoted,
        command
    }) => {
        if (!quoted) return client.exreply(m.chat, "*Reply audio like ts*")

        try {
            let set

            if(command === 'bass') set = '-af equalizer=f=54:width_type=o:width=2:g=20'
            if (command === 'blown') set = '-af acrusher=.1:1:64:0:log'
            if (command === 'deep') set = '-af atempo=4/4,asetrate=44500*2/3'
            if (command === 'earrape') set = '-af volume=12'
            if (command === 'fast') set = '-filter:a "atempo=1.63,asetrate=44100"'
            if (command === 'fat') set = '-filter:a "atempo=1.6,asetrate=22100"'
            if (command === 'nightcore') set = '-filter:a atempo=1.06,asetrate=44100*1.25'
            if (command === 'reverse') set = '-filter_complex "areverse"'
            if (command === 'robot')
                set =
                '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
            if (command === 'slow') set = '-filter:a "atempo=0.7,asetrate=44100"'
            if (command === 'smooth')
                set =
                '-filter:v "minterpolate=mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120"'
            if (command === 'tupai') set = '-filter:a "atempo=0.5,asetrate=65100"'

            const media = await client.downloadAndSaveMediaMessage(qmsg)
            const ran = `${Date.now()}.mp3`

            exec(`ffmpeg -i ${media} ${set} ${ran}`, async (err) => {
                fs.unlinkSync(media)
                if (err) return m.reply('Error processing audio')

                const buff = fs.readFileSync(ran)
                await client.sendMessage(
                    m.chat, {
                        audio: buff,
                        mimetype: 'audio/mpeg'
                    }, {
                        quoted: m
                    }
                )
                fs.unlinkSync(ran)
            })
        } catch (e) {
            console.log(e)
            m.reply(mess.error)
        }
    }
}