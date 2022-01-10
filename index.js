const discord = require("discord.js");
const Canvas = require("canvas");
const fs = require("fs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const client = new discord.Client({
  intents: [
    discord.Intents.FLAGS.GUILDS,
    discord.Intents.FLAGS.GUILD_MEMBERS,
    discord.Intents.FLAGS.GUILD_MESSAGES,
    discord.Intents.FLAGS.DIRECT_MESSAGES,
  ],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

client.events = new discord.Collection();
module.exports.client = client;

fs.readdirSync("./events/").forEach((file) => {
  var jsFiles = fs
    .readdirSync("./events/")
    .filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.warn("[EVENT] Can't find any events");
  let check = false;
  jsFiles.forEach((event) => {
    const eventGet = require(`./events/${event}`);

    try {
      client.events.set(eventGet.name, eventGet);
      if (check == false) {
        console.log(`[EVENT] File ${event} was loaded`);
        check = true;
      }
    } catch (error) {
      return console.log(error);
    }
  });
});

client.login(process.env.TOKEN);
