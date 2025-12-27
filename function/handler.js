import './global.js';
import {
    command$
} from './@sockets/event/messages-upsert.js';
import fs from 'fs';
import path from 'path';
import _ from "lodash";
import stringSimilarity from "string-similarity";
import {
    Low
} from "lowdb";
import {
    JSONFile
} from "lowdb/node";
import yargs from "yargs/yargs";
import {
    fileURLToPath
} from 'url'
import chalk from 'chalk'
import {
    bytesToSize,
    checkBandwidth,
    formatSize,
    getBuffer,
    isUrl,
    jsonformat,
    nganuin,
    pickRandom,
    runtime,
    shorturl,
    formatp,
    Fetch,
    color,
    getGroupAdmins
} from './myfunc.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const developer = fs.readFileSync("./sc_by_derkaXz.png")
const folderPlugin = path.join(__dirname, 'plugins')
const plugins = new Map()
const isPlugin = name => typeof name === 'string' && name.endsWith('.js')
const alwaysPlugins = []

const dbFolder = path.join(__dirname, "../data");
if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder, {
    recursive: true
});

const dbFile = path.join(dbFolder, "database.json");
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, "{}");

const adapter = new JSONFile(dbFile);
const __default = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {}
};

const __data_user = (owner = false) => ({
    Owner: owner,
    isBanned: false,
    Premium: owner,
    hitcmd: 0
})

const __data_chat = {
    mute: false,
    group_participants: false,
    welcome: set.welcome,
    goodbye: set.goodbye,
    demote: set.demote,
    promote: set.promote
};

const __data_setting = {
    autoread: false,
    prefix: '.'
};

global.db = new Low(adapter, __default);

global.opts = yargs(process.argv.slice(2))
    .exitProcess(false)
    .parse();

global.loadDatabase = async function loadDatabase() {
    global.db.READ = true;
    await global.db.read();
    global.db.READ = false;

    if (!global.db.data || Object.keys(global.db.data).length === 0) {
        global.db.data = __default;
        await global.db.write();
    }

    global.db.chain = _.chain(global.db.data);
};

await global.loadDatabase();

export const database_loader = async (m, botLid, botJid) => {
    await global.loadDatabase();

    global.db.data.users[botLid] = {
        ...__data_user(true),
        ...global.db.data.users[botLid]
    };

    global.db.data.settings[botLid] = {
        ...__data_setting,
        ...global.db.data.settings[botLid]
    };

    if (m.isGroup)
        global.db.data.chats[m.chat] = {
            ...__data_chat,
            ...global.db.data.chats[m.chat]
        };

    if (m.sender == botJid) return
    global.db.data.users[m.sender] = {
        ...__data_user(),
        ...global.db.data.users[m.sender]
    };
};

async function loadPlugin(filePath) {
    try {
        const mod = await import(filePath + `?update=${Date.now()}`)
        if (!mod?.default) return

        const plugin = mod.default
        if (typeof plugin.run !== 'function') return

        if (plugin.id) {
            const ids = Array.isArray(plugin.id) ? plugin.id : [plugin.id]
            for (const cmd of ids) {
                plugins.delete(cmd)
                plugins.set(cmd, plugin)
            }
            return
        }

        if (!alwaysPlugins.includes(plugin)) {
            alwaysPlugins.push(plugin)
        }

    } catch (err) {
        console.log(chalk.bgRed("[PLUGIN ERROR]"), filePath, err)
    }
}


function scanPlugin(dir) {
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file)
        const stat = fs.statSync(full)

        if (stat.isDirectory()) {
            scanPlugin(full)
        } else if (isPlugin(file)) {
            loadPlugin(full)
        }
    }
}

scanPlugin(folderPlugin)

function watchRecursive(dir) {
    fs.watch(dir, (event, filename) => {
        if (!filename) return
        const full = path.join(dir, filename)
        if (fs.existsSync(full)) {
            const stat = fs.statSync(full)
            if (stat.isDirectory()) return watchRecursive(full)
        }
        if (isPlugin(filename)) loadPlugin(full)
    })

    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file)
        if (fs.statSync(full).isDirectory()) watchRecursive(full)
    }
}

watchRecursive(folderPlugin)

command$.subscribe(async system => {
    if (!system.m.text) return

    for (const plugin of alwaysPlugins) {
        try {
            await plugin.run(system)
        } catch (err) {
            console.log(
                chalk.bgRed("[ALWAYS PLUGIN ERROR]"),
                err.message
            )
        }
    }
})

command$.subscribe(async system => {
    try {
        const {
            m,
            client,
            botLid,
            jid
        } = system
        const plugin = plugins.get(system.command)
        const isGroup = m?.key?.remoteJid?.endsWith("@g.us");

        let groupInfo = {
            isAdmins: false,
            isBotAdmins: false
        }

        if (!plugin) {
            const allCmd = Array.from(plugins.keys())
            if (!system.command) return

            const matches = stringSimilarity.findBestMatch(system.command, allCmd)
            const hasil = matches.ratings
                .filter(x => x.rating >= 0.40)
                .sort((a, b) => b.rating - a.rating)

            if (hasil.length > 0) {
                let teks = `*Command tidak ditemukan* ❗\n`
                teks += `Mungkin maksud mu:\n\n`

                hasil.forEach(x => {
                    teks += `• *${x.target}* — (${Math.round(x.rating * 100)}%)\n`
                })

                teks += `\n➜ Ketik ulang jika benar`
                return system.m.reply(teks)
            }
            return
        }

        if (m.isGroup && (plugin.admin || plugin.botadmin)) {
            const metadata = await client.groupMetadata(m.chat)
            groupInfo = getGroupAdmins(
                metadata.participants,
                m,
                botLid
            )
        }

        const isOwner = Boolean(global.db.data.users[m.sender]?.Owner);
        const isPremium = Boolean(global.db.data.users[m.sender]?.Premium) || isOwner;
        const botNumber = await client.decodeJid(client.user.id);
        const recode = nodelete
        const rules = [
            [plugin.group && !m.isGroup, mess.group],
            [plugin.owner && !isOwner, mess.owner],
            [plugin.premium && !isPremium, mess.premium],
            [plugin.admin && !groupInfo.isAdmins, mess.admin],
            [plugin.botadmin && !groupInfo.isBotAdmins, mess.botAdmin],
        ]

        for (const [fail, msg] of rules) {
            if (fail) return m.reply(msg)
        }

        if (!client.public && !m.key.fromMe && !isOwner) return

        client.autoread && client.readMessages([m.key])

        await plugin.run(system);

        global.db.data.users[m.sender].hitcmd += 1;
        await global.db.write();

    } catch (err) {
        console.log(chalk.bgRed("[PLUGIN ERROR]"), system.command, err)
    }
})