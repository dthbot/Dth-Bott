import fetch from 'node-fetch';

const userMemory = new Map();

const handler = async (m, { text, conn }) => {
  const userId = m.sender;
  const userName = m.pushName || 'amico';

  if (!text) return m.reply('💬 Usa il comando così: *.mistral <domanda o messaggio>*');

  // Invia messaggio temporaneo che poi verrà modificato
  const thinking = await conn.sendMessage(m.chat, { text: '🧠 *Un attimo sto pensando…*' }, { quoted: m });

  // Inizializza la "memoria" utente
  if (!userMemory.has(userId)) userMemory.set(userId, []);
  const history = userMemory.get(userId);

  // Costruzione prompt
  const systemPrompt = `
Sei VareBot, assistente WhatsApp brillante e utile. 
Rispondi con chiarezza, tono umano e ogni tanto ironia. L’utente si chiama ${userName}.
`.trim();

  // Aggiorna memoria
  history.push({ role: 'user', content: text });
  if (history.length > 6) history.shift();

  const payload = {
    model: 'mistralai/mistral-small-3.2-24b-instruct:free',
    messages: [
      { role: 'system', content: systemPrompt },
      ...history
    ],
    temperature: 0.7
  };

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${global.APIKeys.openrouter}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/realvare',
        'X-Title': 'varebot'
      },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    const reply = result.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.log('[❌ Nessuna risposta valida]', result);
      return conn.sendMessage(m.chat, { text: `${global.errore}` }, { quoted: m });
    }

    // Salva risposta in memoria
    history.push({ role: 'assistant', content: reply });
    if (history.length > 6) history.shift();

    // Modifica il messaggio originale con la risposta
    await conn.sendMessage(m.chat, {
      text: reply,
      edit: thinking.key
    });

  } catch (err) {
    console.error('[errore mistral]', err);
    await conn.sendMessage(m.chat, {
      text: '❌ Errore durante la chiamata a Mistral/OpenRouter.',
      edit: thinking.key
    });
  }
};

handler.command = ['mistral'];
handler.help = ['mistral <testo>'];
handler.tags = ['ia', 'iatesto', 'tools'];
handler.register = true
export default handler;