import { fork } from 'child_process'
import chalk from 'chalk'
import path from 'path'
import {
    fileURLToPath
} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Source: https://github.com/WhiskeySockets/Baileys/blob/4599ff84bbdef332c6f0a01b24376f868254ed89/engine-requirements.js#L1

const major = parseInt(process.versions.node.split('.')[0], 10);

if (major < 20) {
  console.error(
    `\n❌ This script requires Node.js 20+ to run reliably.\n` +
    `   You are using Node.js ${process.versions.node}.\n` +
    `   Please upgrade to Node.js 20+ to proceed.\n`
  );
  process.exit(1);
}

function start() {
    let p = fork(path.join(__dirname, "function/@sockets/main.js"));

    p.on("message", message => {
        if (message === "reset") {
            console.log(`${chalk.bgYellow("[SYSTEM]")} -> Restarting bot...`)
            p.kill();
            start();
        }
    });

    p.on("exit", code => {
        console.log(`${chalk.bgRed("[SYSTEM]")} -> Bot exited with code: ${chalk.red(code)}`)
        if (code == 0 || code == 1) start()
    });
}

start();
