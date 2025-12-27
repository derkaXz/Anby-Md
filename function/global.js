import fs from 'fs' 
/*
  Pembuat: derkaXz (Derka xz)
  Catatan: reupload tag mas @derkaXz, di larang keras jual bot ini kecuali sudah di recode semua, thumbnail punya hak cipta (saya sendiri) buatan seseorang lalu di jual sangatlah tidak rispek. тег reupload братан @derkaXz. продажа этого бота строго запрещена, если он не был полностью перекодирован, миниатюра имеет авторские права (мные), сделанные кем-то, а затем продавать ее - это очень неуважительно ✌️💔😔. Jangan hapus ini saudaraku!
  -
  Reply Default bot
*/
global.mess = {
    succes: '*Request completed ✅*',
    done: '*Request completed ✅*',
    query: '*Enter a text, Ex: .(cmd) text/link ❗*',
    owner: '*For owner only 👑*',
    private: '*For private messages only ‼️*',
    group: '*For group only ‼️*',
    wait: '*🟢 Processing request...*',
    premium: '*For premium users only ☘️*',
    jadibot: '*You are not a jadibot user ❌*',
    admin: '*You are not an admin ❌*',
    botAdmin: '*(◍•ᴗ•◍) Please make me an admin*',
    banned: '*This chat has been banned ❌*',
    error: '*🔴 Your request failed*',
    fitur: {
      on: '*Feature is on ✅*',
      off: '*Feature is off ✅*',
      maintenance: '*Features are being maintenance 🔧*',
      on_off: '*Enter text on/off to turn it off or on (cmd) 🌻*'
    }
} 
global.set = {
  welcome: "Welcome @user ke @group, moga betah ya !",
  goodbye: "@user telah keluar dari @group",
  promote: "@user sekarang telah menjadi admin di @group 🔥",
  demote: "@user anda bukan admin lagi 😹"
} // ini default aja, boleh di ubah, bisa di set per grup

/* 
  Path thumbnail 
*/
global.thumurl = '_'
global.thumb1 = fs.readFileSync("./data/@etc/ui/thumb1.jpeg") // wajib dibawah 200kb 
global.thumb1x1 = fs.readFileSync("./data/@etc/ui/thumb11.jpeg") // wajib d bawah 10kb, kompres di: image.pi7.org
global.developer = fs.readFileSync("./sc_by_derkaXz.png") // Mau recode script? Hubungi atmin ya: Derka xz (Yt)

/*
  Tampilan munu & reply
*/
global.urls = "https://whatsapp.com/channel/0029Vb5jfyKBqbr7GIkkii1Y"
global.sourceurl = "https://chat.whatsapp.com/BSmzS9MStAx8cUa33oNeVz"
global.ids = "120363399405036720@newsletter"
global.nems = "☘️ ꜱᴄʀɪᴘᴛ ʙʏ ᴢɪʏᴏᴏꜰꜰᴄ"
global.title = "Order cannot be broken - "
global.xone = "☘️ 𝗔𝗻𝗯𝘆 𝗠𝗱"
global.body = "꒰ᐢ. .ᐢ꒱ "
global.filename = "-"
global.packname = 'ㅤㅤ' // _______[ stiker ]
global.author = 'ㅤㅤ' // _______[ stiker ]
global.jpegfile = "𝚁𝚎𝚌𝚑𝚊𝚗𝚐𝚎 𝚝𝚑𝚎 𝚜𝚎𝚕𝚕𝚎𝚌𝚝𝚒𝚘𝚗"

/*
  Setting an Default bot
*/
global.debug = true // debug "messages.upsert"
global.owner = '6283117190494' // tambah manual pake: .addowner di nomor bot
global.pairkey = "AMBARUWO"
global.eventMap = {
    "creds.update": "./event/creds-update.js",
    "connection.update": "./event/connection-update.js",
    "messages.upsert": "./event/messages-upsert.js",
    "group-participants.update": "./event/participants-update.js"
} // gausah di oprek🔥
