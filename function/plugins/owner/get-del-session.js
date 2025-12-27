import fs from 'fs'

export default {
    id: ['delsession', 'getsession'],
    owner: true,
    run: async ({
        client,
        m,
        itsMe,
        command,
        text
    }) => {
        switch (command) {
            case 'delsession':
            case 'clearsession': {
                m.reply("Sudahlah bung, cara ini tidak bekerja, buat session lagi kalo respon bot nya *\"menunggu pesan\"*.")
                }
                break
                case 'getsession':
                const sesi = fs.readFileSync('./data/@etc/session/creds.json')
                client.sendMessage(m.chat, {
                    document: sesi,
                    mimetype: 'application/json',
                    fileName: 'creds.json',
                    caption: mess.done
                }, {
                    quoted: m
                })
                break
            }
        }
    }
