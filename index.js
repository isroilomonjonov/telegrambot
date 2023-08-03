const TelegramBot = require("node-telegram-bot-api");
const { gameOptions, againOption } = require("./options");
const token = "6361411355:AAFbJ4mTQI5OYhZ4wjrQI9nt37nyrI9zsBM";
const bot = new TelegramBot(token, { polling: true });

const obj = {};

const startGame=async(chatId)=>{
    await bot.sendMessage(
        chatId,
        "Kompyuter 0 dan 9 gacha son o'yladi, siz shu sonni topishingiz kerak"
      );
      const randomNumber = Math.floor(Math.random() * 10);
      obj[chatId] = randomNumber;
       await bot.sendMessage(chatId, "To'gri sonni toping", gameOptions);
}
const botStart = () => {
  bot.setMyCommands([
    { command: "/start", description: "Botni ishga tushirish" },
    { command: "/info", description: "Bot haqida malumot" },
    { command: "/game", description: "O'yin o'ynash" },
  ]);

  bot.on("message", async (msg) => {
    console.log(msg);
    await bot.sendMessage(
      1153327472,
      `Botga ${msg.from?.first_name} ${msg.from?.last_name} ismli  ${
        msg.from?.username
      } usernameli ${msg.from.is_bot ? "bot" : "inson"} "${
        msg?.text
      }" malumot jonatdi!`
    );
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/1.webp"
      );
      return await bot.sendMessage(
        chatId,
        `Assalomu Alekum xurmatli ${msg.from?.first_name} ${msg.from?.last_name} botga hush kelibsiz!`
      );
    }
    if (text === "/info") {
      return await bot.sendMessage(
        chatId,
        `Bu bot Isroiljon Omonjonov tomonidan yaratilgan, sizni usernameingiz ${msg.from?.username}!`
      );
    }
    if (text === "/game") {
      return startGame(chatId)
    }
    bot.sendMessage(chatId, "Bot");
  });
  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data==="/game_restart"){
        return startGame(chatId)
    }
    if (data == obj[chatId]) {
      return bot.sendMessage(
        chatId,
        `Tabriklayman Siz ${data} tanladingiz, va javobingiz to'gri kampyuter ${obj[chatId]} ni tanlagan edi!!!`,
        againOption
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Siz ${data} tanladingiz va javobingiz notog'ri kampyuter ${obj[chatId]} ni tanlagan edi!!!`,
        againOption
      );
    }
  });
};
botStart();
