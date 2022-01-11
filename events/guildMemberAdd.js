const client = require("../index").client;
const discord = require("discord.js");
const Canvas = require("canvas");

const welcomeCanvas = require("../utils/canvas");

client.on("guildMemberAdd", async (member) => {
  const welcomechannel = client.channels.cache.get("919158447168176158");
  let canvas = welcomeCanvas;
  canvas.context.font = "42px minecraft";
  canvas.context.textAlign = "center";
  canvas.context.fillText(member.user.tag, 512, 410);
  canvas.context.font = "32px noto sans";
  canvas.context.fillText(
    `Kamu adalah member ke ${member.guild.memberCount}`,
    512,
    455
  );
  canvas.context.beginPath();
  canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
  canvas.context.closePath();
  canvas.context.clip();
  await Canvas.loadImage(
    member.user.displayAvatarURL({ format: "png", size: 1024 })
  ).then((img) => {
    canvas.context.drawImage(img, 393, 47, 238, 238);
  });
  let attachment = new discord.MessageAttachment(
    canvas.create.toBuffer(),
    `welcome-member.png`
  );
  let embed = new discord.MessageEmbed()
    .setAuthor({
      name: "SpawnPoint",
      iconURL:
        "https://lh3.googleusercontent.com/YgldbDl0fWVGbZ2bQdlckPPr2ic4v4QMQM2hzykxTF9zPgfsm4V0p2K13L3IguSiYvY2FNWegJR3msObSznpdDrAEUAr1zMUdw=s400",
    })
    .setColor("#0c6c84")
    .setTitle(
      `Selamat Datang di Official Discord Server **${member.guild.name}**!!!`
    )
    .setDescription(
      `Halo ${member}, Selamat datang di server kita!! Harap terlebih dahulu membaca dan menaati semua <#914739553917624400> yang ada di server kita!!!
  Jika ada yang ingin ditanyakan, silahkan bertanya ke <@&907610677701656616> atau ke <@&907611023136153621>`
    )
    .setImage(`attachment://welcome-member.png`)
    .setFooter({ text: "discord.io/lohardlysmp" })
    .setTimestamp();

  try {
    welcomechannel.send({
      embeds: [embed],
      files: [attachment],
    });
  } catch (error) {
    console.log(error);
  }
});
