let handler = async (m, { text, command, conn }) => {
  let sJid = conn.decodeJid(m.sender);
  let lidJid = sJid.replace('@s.whatsapp.net', '@lid');
  let user = global.db.data.users[sJid] || global.db.data.users[lidJid];
  
  if (!user) {
    return m.reply('『 ⚠️ 』 Errore: utente non trovato nel database.')
  }
  
  if (['listaafk', 'listafk', 'afklist'].includes(command)) {
    const chatData = global.db.data.chats[m.chat];
    const groupUsers = chatData?.users ? Object.keys(chatData.users).filter(jid => !jid.endsWith('@g.us')) : [];
    
    const afkUsers = [];
    
    groupUsers.forEach((userJid) => {
      let jid = conn.decodeJid(userJid);
      let afkUser = global.db.data.users[jid];
      let lidJidLocal = jid.replace('@s.whatsapp.net', '@lid');
      let lidAfkUser = global.db.data.users[lidJidLocal];
      
      if (afkUser && afkUser.afk) {
        const username = conn.getName(jid) || jid.split('@')[0];
        const motivo = afkUser.motivoafk || 'Assente';
        const since = afkUser.afkda;
        const duration = since ? formatDuration(Date.now() - since) : 'N/D';
        
        afkUsers.push({
          jid: jid,
          name: username,
          motivo,
          duration
        });
      } else if (lidAfkUser && lidAfkUser.afk) {
        const username = conn.getName(jid) || jid.split('@')[0];
        const motivo = lidAfkUser.motivoafk || 'Assente';
        const since = lidAfkUser.afkda;
        const duration = since ? formatDuration(Date.now() - since) : 'N/D';
        
        afkUsers.push({
          jid: jid,
          name: username,
          motivo,
          duration
        });
      }
    });
    if (!groupUsers.includes(sJid) && !groupUsers.includes(lidJid)) {
      let afkUserSender = global.db.data.users[sJid] || global.db.data.users[lidJid];
      if (afkUserSender && afkUserSender.afk) {
        const username = conn.getName(sJid) || sJid.split('@')[0];
        const motivo = afkUserSender.motivoafk || 'Assente';
        const since = afkUserSender.afkda;
        const duration = since ? formatDuration(Date.now() - since) : 'N/D';
        
        afkUsers.push({
          jid: sJid,
          name: username,
          motivo,
          duration
        });
      }
    }
    
    if (afkUsers.length === 0) {
      return m.reply('『 ✅ 』 Nessun utente è attualmente AFK in questo gruppo.');
    }
    
    let message = `『 📋 』 *LISTA UTENTI AFK* (${afkUsers.length})\n\n`;
    afkUsers.forEach((u, i) => {
      message += `${i + 1}. @${u.jid.split('@')[0]}\n`;
      message += `   『 💤 』 Motivo: ${u.motivo}\n`;
      message += `   『 ⏰ 』 Da: ${u.duration}\n\n`;
    });
    
    return m.reply(message, null, {
      mentions: afkUsers.map(u => u.jid)
    });
  }
  
  if (['delafk', 'deleteafk', 'removeafk'].includes(command)) {
    let afkFound = false;
    let duration = 'poco tempo';
    
    if (global.db.data.users[sJid] && global.db.data.users[sJid].afk) {
      duration = global.db.data.users[sJid].afkda ? formatDuration(Date.now() - global.db.data.users[sJid].afkda) : 'poco tempo';
      global.db.data.users[sJid].afk = false;
      global.db.data.users[sJid].motivoafk = '';
      global.db.data.users[sJid].afkda = null;
      afkFound = true;
    }
    
    if (global.db.data.users[lidJid] && global.db.data.users[lidJid].afk) {
      duration = global.db.data.users[lidJid].afkda ? formatDuration(Date.now() - global.db.data.users[lidJid].afkda) : 'poco tempo';
      global.db.data.users[lidJid].afk = false;
      global.db.data.users[lidJid].motivoafk = '';
      global.db.data.users[lidJid].afkda = null;
      afkFound = true;
    }
    
    if (!afkFound) {
      return m.reply('『 ℹ️ 』 Non sei in modalità AFK.');
    }
    
    return m.reply(`『 ✅ 』 Bentornato/a! Eri AFK da ${duration} 『 👋 』`);
  }
  
  const motivo = text?.trim() || 'Assente';
  
  let setCount = 0;
  if (global.db.data.users[sJid]) {
    global.db.data.users[sJid].afk = true;
    global.db.data.users[sJid].motivoafk = motivo;
    global.db.data.users[sJid].afkda = Date.now();
    setCount++;
  }
  
  if (global.db.data.users[lidJid]) {
    global.db.data.users[lidJid].afk = true;
    global.db.data.users[lidJid].motivoafk = motivo;
    global.db.data.users[lidJid].afkda = Date.now();
    setCount++;
  }
  
  return m.reply(`『 💤 』 *Sei ora in modalità AFK*\n『 📝 』 Motivo: ${motivo}\n\n『 💡 』 _Usa .delafk per tornare attivo_`);
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const g = Math.floor(h / 24);
  
  if (g > 0) return `${g}g ${h % 24}o`;
  if (h > 0) return `${h}o ${m % 60}m`;
  if (m > 0) return `${m}m ${s % 60}s`;
  return `${s}s`;
}

handler.help = ['afk [motivo]','delafk','listaafk'];
handler.tags = ['main'];
handler.command = /^(afk|delafk|deleteafk|removeafk|listaafk|listafk|afklist)$/i;
handler.group = true;

export default handler;