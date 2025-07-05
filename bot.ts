import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

const token = "7825490626:AAEAk6jBFksCpGy9y_2x0WeBqDartHaDxNE";
const chatId = "1081910690"; 

const bot = new TelegramBot(token, { polling: true });

let msgToRemind = `
Clean mirrors Reminder 

Put a heart if you’ve done it ❤️
`;


cron.schedule("0 12 */5 * *", () => {
  bot.sendMessage(chatId, msgToRemind);
  console.log("Sent reminder to clean the glass.");
});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `
      نورت بوتك يغالي 👋
هذا البوت مهمته يذكرك كل 5 ايام بمهمة التنظيف 🌿`
    );

});


