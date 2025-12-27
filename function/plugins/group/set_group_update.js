import os from 'os';
import fs from 'fs';

export default {
    id: ['setwelcome', 'setgoodbye', 'setpromote', 'setdemote'],
    admin: true,
    group: true,
    run: async ({
        client,
        m,
        username,
        runtime,
        chatdb,
        command,
        text
    }) => {
        if (!text) return m.reply(mess.query)

        m.reply(mess.done)

        switch (command) {
            case 'setwelcome':
                chatdb.welcome = text
                break
            case 'setgoodbye':
                chatdb.goodbye = text
                break
            case 'setpromote':
                chatdb.promote = text
                break
            case 'setdemote':
                chatdb.demote = text
                break
        }
    }
}