const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')

const token = '7457695077:AAGB7OuJwSKxyyjch2GMc0XHjDdwvqwwj-s'

const bot = new TelegramBot(token, {polling: true})

const commands = [
  { command: 'start', description: 'Bot starts work' },
  { command: 'photo', description: 'Send photo' },
  { command: 'audio', description: 'Send audio' },
  { command: 'document', description: 'Send document' },
  { command: 'video', description: 'Send video' },
  { command: 'location', description: 'Send location' },
  { command: 'contact', description: 'Send contact' },
]
bot.setMyCommands(commands)

bot.on('text', (msg) => {
  const chatId = msg.chat.id

  if(msg.text === '/start') {
    bot.sendMessage(chatId, 'Bot started')
  } else if(msg.text === '/photo') {
    bot.sendPhoto(chatId, './assets/win.png', {
      caption: 'Some photo',
    })
  } else if(msg.text === '/audio') {
    bot.sendMessage(chatId, 'Start audio uploading...')

    fs.readFile(__dirname + '/assets/audio.mp3', (err, file) => {
      bot.sendAudio(chatId, file, {
        title: 'Audio'
      })
    })
  } else if(msg.text === '/document') {
    bot.sendMessage(chatId, 'Start document uploading...')

    fs.readFile(__dirname + '/assets/document.zip', (err, file) => {
      bot.sendDocument(chatId, file)
    })
  } else if(msg.text === '/video') {
    bot.sendMessage(chatId, 'Start video uploading...')

    // bot.sendVideo(chatId, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4')
    fs.readFile(__dirname + '/assets/video.mp4', (err, file) => {
      bot.sendVideo(chatId, file)
    })
  } else if(msg.text === '/location') {
      bot.sendLocation(chatId, 39.201688, 46.413244)
  } else if(msg.text === '/contact') {
    bot.sendContact(chatId, '+37412345678', 'Tumo', {
      last_name: 'Bot'
    })
}
})
 