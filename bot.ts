import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import { keyboard } from "telegraf/typings/markup";

// ✅ Replace with your bot token from BotFather
const token = "7825490626:AAEAk6jBFksCpGy9y_2x0WeBqDartHaDxNE";
const chatId = "970627200"; 

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
      msgToRemind,
    );

});

bot.onText(/\/set/, (msg) => {
    bot.sendMessage(msg.chat.id, 'send the message you want to set as a reminder:');
    bot.once('message', (newMsg) => {
        msgToRemind = newMsg.text || msgToRemind;
        bot.sendMessage(msg.chat.id, `Message updated to: ${msgToRemind}`);
    });
});

bot.on('message', (msg) => {
    console.log("Chat ID:", msg.chat.id);



    switch (msg.text) {
      case "/settings":
        bot.sendMessage(msg.chat.id, "Choose an option:", {
          reply_markup: {
            keyboard: [[{ text: "My ID" }], [{ text: "Change Message" }]],
            resize_keyboard: true,
            one_time_keyboard: false,
          },
        });
            break;
        case "My ID":
          bot.sendMessage(msg.chat.id, `Your chat ID is: ${msg.chat.id}`);
          break;
        case "Change Message":
         bot.sendMessage(msg.chat.id, "Please send me the new message:");
            // here how get new message from user in this point and replace with msgToRemind
            changeMessage();
            break;
         
        
    }
   
});

function changeMessage() {
bot.on("text", (msg) => {
  console.log("Received message:", msg.text);
  msgToRemind = msg.text ?? "";
  bot.sendMessage(msg.chat.id, "Message updated successfully!");
});
}
