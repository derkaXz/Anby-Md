import moment from 'moment-timezone'

export default {
    id: ['listgc', 'listgroup'],
    owner: true,
    run: async ({
        client,
        m
    }) => {
        const groups = await client.groupFetchAllParticipating()
        const groupList = Object.values(groups)

        let teks = `*Group Chat*\n\nTotal: ${groupList.length} Group\n\n`

        for (const metadata of groupList) {
            teks +=
`•⟢ Nama : ${metadata.subject}
• Owner : Meta AI (System)
• ID : ${metadata.id}
• Dibuat : ${metadata.creation
    ? moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')
    : '-'}
•⟢ Member : ${metadata.participants.length}

────────────────────────\n\n`
        }

        await client.sendTextWithMentions(m.chat, teks, m)
    }
}