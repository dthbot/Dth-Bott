import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

/*⭑⭒━━━✦❘༻☾⋆⁺₊✧ 𝓿𝓪𝓻𝓮𝓫𝓸𝓽 ✧₊⁺⋆☽༺❘✦━━━⭒⭑*/

global.sam = ['393476686131',]
global.owner = [
  ['393476686131', 'sam', true],
  ['393511082922', 'gio', true],
  ['393392645292', 'mavko', true],
  ['67078163216', 'Felix', true],
  ['393514357738', 'vare', true],
]
global.mods = ['393476686131', '393511082922', '67078163216']
global.prems = ['393476686131', '393511082922', '67078163216']

/*⭑⭒━━━✦❘༻🩸 INFO BOT 🕊️༺❘✦━━━⭒⭑*/

global.nomepack = 'vare ✧ bot'
global.nomebot = '✧˚🩸 varebot 🕊️˚✧'
global.wm = 'vare ✧ bot'
global.autore = '𝐬𝐚𝐦'
global.dev = '⋆｡˚- 𝐬𝐚𝐦'
global.testobot = `༻⋆⁺₊𝓿𝓪𝓻𝓮𝓫𝓸𝓽₊⁺⋆༺`
global.versione = '2.5.7'
global.errore = '⚠️ *Errore inatteso!* Usa il comando `.segnala <errore>` per avvisare lo sviluppatore.'

/*⭑⭒━━━✦❘༻🌐 LINK 🌐༺❘✦━━━⭒⭑*/

global.repobot = 'https://github.com/realvare/varebot'
global.gruppo = 'https://chat.whatsapp.com/bysamakavare'
global.canale = 'https://whatsapp.com/channel/0029VbB41Sa1Hsq1JhsC1Z1z'
global.insta = 'https://www.instagram.com/samakavare'

/*⭑⭒━━━✦❘༻ MODULI ༺❘✦━━━⭒⭑*/

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

/*⭑⭒━━━✦❘🗝️ API KEYS 🌍༺❘✦━━━⭒⭑*/

global.APIKeys = {
  spotifyclientid: 'varebot',
  spotifysecret: 'varebot',
  browserless: 'varebot',
  screenshotone: 'varebot',
  screenshotone_default: 'varebot',
  tmdb: 'varebot',
  gemini: 'AIzaSyDG70wvOfP2e-qEX78wT9RGZ4kAGe0Q2r0',
  elevenlabs: 'varebot',
  ocrspace: 'varebot',
  assemblyai: 'varebot',
  google: 'AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ',
  googlex: 'AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ',
  googleCX: 'varebot',
  genius: 'varebot',
  replicate: 'varebot',
  unsplash: 'varebot',
  removebg: 'FEx4CYmYN1QRQWD1mbZp87jV',
  openrouter: 'varebot',
}

/*⭑⭒━━━✦❘༻🪷 SISTEMA XP/EURO 💸༺❘✦━━━⭒⭑*/

global.multiplier = 1

/*⭑⭒━━━✦❘༻📦 RELOAD 📦༺❘✦━━━⭒⭑*/

let filePath = fileURLToPath(import.meta.url)
let fileUrl = pathToFileURL(filePath).href

watchFile(filePath, () => {
  unwatchFile(filePath)
  console.log(chalk.bgMagentaBright("File: 'config.js' aggiornato!"))
  import(`${fileUrl}?update=${Date.now()}`)
})