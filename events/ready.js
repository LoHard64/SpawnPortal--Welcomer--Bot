const client = require("../index").client;
client.on("ready", async () => {
  client.user.setPresence({
    activities: [{ name: "New Users", type: "WATCHING" }],
  });
  console.log(`${client.user.tag} online successfully`);
});
