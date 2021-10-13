const TelegramBot = require('node-telegram-bot-api');
const express = require("express");

// replace the value below with the Telegram token you receive from @BotFather
const token = '2092432478:AAGlPB11svBVW6-H-Ml_jR1B4ZxSEfnkdyQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1] + chatId; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'your id: ' + chatId);
});

const server = express();
server.all("/msg", (req, res) => {
  const msg = req.query.msg
  bot.sendMessage('719328994', msg);
  return {}
});
server.listen(process.env.PORT || 3000, (err) => {
   if (err) throw err;
   console.log(`> Ready on http://localhost:${process.env.PORT}`);
});
