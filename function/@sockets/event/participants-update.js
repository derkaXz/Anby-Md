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

const developer = fs.readFileSync("./sc_by_derkaXz.png")

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function(update, client, authState, usePairing) {

    const id = update.id;
    const participants = update.participants;
    const action = update.action;

    if (!id || !participants.length || !action) return;
    if (!global.db.data.chats[id].group_participants) return;

    const teksWelcome = global.db.data.chats[id].welcome;
    const teksGoodbye = global.db.data.chats[id].goodbye;
    const teksPromote = global.db.data.chats[id].promote;
    const teksDemote = global.db.data.chats[id].demote;
    const meta = await client.groupMetadata(id);
    const groupName = meta.subject;
    const groupDesc = meta.desc || "-";

    const templateInfo = (text, user) => {
        return text
            .replace(/@user/gi, `@${user.id.split("@")[0]}`)
            .replace(/@group/gi, groupName)
            .replace(/@desc/gi, groupDesc);
    };

    for (let user of participants) {

        let ppimg;
        let message;
        try {
            ppimg = await client.profilePictureUrl(user.id, 'image');
        } catch {
            ppimg = "https://i.ibb.co/5FcF2Jq/no-avatar.jpg";
        }

        if (action === 'add') {
            message = templateInfo(teksWelcome, user);
        } else if (action === 'remove') {
            message = templateInfo(teksGoodbye, user);
        } else if (action === 'promote') {
            message = templateInfo(teksPromote, user);
        } else if (action === 'demote') {
            message = templateInfo(teksDemote, user);
        }

        await client.sendMessage(id, {
            text: message,
            contextInfo: {
                mentionedJid: [user.id]
            }
        });
    }
}