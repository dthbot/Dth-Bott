export async function handler(m, { conn }) {
  try {
    const jid = m.chat

await conn.sendMessage(
    jid,
    {
        image: { url: './media/menu/menu.jpg' },
        viewOnce: true,
        caption: '🤒'
    }
)

  } catch (e) {
    console.error("❌ Errore ov:", e)
    m.reply("Errore ov: " + e.message)
  }
}

handler.command = ["ov"]
export default handler