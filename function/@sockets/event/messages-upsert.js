import Boom from '@hapi/boom'
import qrcode from 'qrcode-terminal'
import pino from 'pino'
import readline from 'readline'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import {
    fileURLToPath
} from 'url'
import {
    proto,
    getContentType,
    areJidsSameUser,
    generateWAMessage,
    useMultiFileAuthState,
    makeWASocket,
    makeCacheableSignalKeyStore,
    DisconnectReason,
    jidDecode,
    Browsers,
    downloadContentFromMessage,
    fetchLatestBaileysVersion
} from '@breakbeat/baileys'
import {
    Subject
} from 'rxjs'
import {
    serialize
} from '../serialize.js'
import {
    database_loader
} from '../../handler.js'
import {
    fileTypeFromBuffer
} from "file-type";
import util from 'util';
import {
    exec
} from 'child_process';
import {
    runtime
} from '../../myfunc.js';

export const command$ = new Subject()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const developer = fs.readFileSync("./sc_by_derkaXz.png")

export default async function(update, client, authState, usePairing) {

    const msg = update.messages[0];
    const now = Math.floor(Date.now() / 1000);
    const messageTime = Number(msg.messageTimestamp);
    const loadkey = now - messageTime;

    if (loadkey > 5 * 60) return;
    if (!msg.message) return;
    if (!client.user) return;
    if (!client.user.lid) return;
    if (debug) console.log(msg)

    const m = await serialize(client, msg);
    const botLid = client.user.lid.split(':')[0] + '@lid';
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = (m.sender == botNumber) || false;

    const fatkuns = m.quoted || m;
    const username = m.pushName || "No Name";
    const quoted =
        fatkuns?.mtype == 'buttonsMessage' ? fatkuns[Object.keys(fatkuns)[1]] :
        fatkuns?.mtype == 'templateMessage' ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] :
        fatkuns?.mtype == 'product' ? fatkuns[Object.keys(fatkuns)[0]] :
        m.quoted || m;

    await database_loader(m, botLid, botNumber)
    if (!global.db.data.users) await global.db.write();

    const isOwner = global.db.data.users[m.sender]?.Owner || false;
    const userdb = global.db.data.users[m.sender];
    const chatdb = global.db.data.chats[m.sender];
    const settingdb = global.db.data.settings[m.sender]
    const q = quoted?.msg ? quoted.msg : quoted;
    const mime = q?.mimetype || (q?.message?.imageMessage ? 'image/jpeg' : 
             q?.message?.videoMessage ? 'video/mp4' : 
             q?.message?.stickerMessage ? 'image/webp' : '');
    const qmsg = (quoted?.msg || quoted);
    const isMedia = /image|webp|video|sticker|audio/.test(mime);
    const payloadBase = {
        client,
        m,
        qmsg,
        isMedia,
        userdb,
        chatdb,
        settingdb,
        runtime,
        quoted,
        itsMe,
        username,
        botLid,
        mime
    }

    if (!m.text) return;

    command$.next(payloadBase)

    if (m.text.startsWith('.')) {
        const [cmd, ...args] = m.text.trim().split(/\s+/)
        command$.next({
            ...payloadBase,
            id: cmd.replace('.', ''),
            command: cmd.replace('.', ''),
            text: args.join(" "),
            args
        })
    }
    
    if (!isOwner) return

    if (m.text.startsWith('=>')) {
        function Return(sul) {
            let sat = JSON.stringify(sul, null, 2);
            let bang = util.format(sat);
            if (sat === undefined) bang = util.format(sul);
            return m.reply(bang);
        }

        try {
            const res = await eval(`(async () => { return ${m.text.slice(3)} })()`);
            m.reply(util.format(res));
        } catch (e) {
            m.reply(String(e));
        }
    }

    if (m.text.startsWith('>>')) {
        const kode = m.text.trim().split(/ +/)[0];      
        let teks;
        try {
            teks = await eval(`(async () => { ${kode === '>>' ? 'return' : ''} ${m.text.slice(3)} })()`);
        } catch (e) {
            teks = e;
        } finally {
            await m.reply(util.format(teks));
        }
    }

    if (m.text.startsWith('$')) {
        exec(m.text.slice(2), (err, stdout) => {
            if (err) return m.reply(`${err}`);
            if (stdout) return m.reply(stdout);
        });
    }
}