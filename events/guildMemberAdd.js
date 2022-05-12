const client = require("../index").client;
const discord = require("discord.js");
const Canvas = require("canvas");

Canvas.registerFont("./fonts/1_Minecraft-Regular.otf", {
  family: "Minecraft",
});
Canvas.registerFont("./fonts/NotoSans-Bold.ttf", { family: "Noto Sans" });

const welcomeCanvas = require("../utils/canvas");

client.on("guildMemberAdd", async (member) => {
  const welcomer = new discord.WebhookClient({
    //for test: https://discord.com/api/webhooks/971020854219661402/eBOV13BwCMnM-X4KeI09fetjL2L1fKjKjngvf3-NAyHaZznNkv3mXd4mVRk012e2_xSA
    //https://discord.com/api/webhooks/971011237842399263/Oehs6mH2F4jqKffsR3I9cO9TaarQ6zfwihWJOffXtad1ywvD2D-OqVDz30BGuoqgu4CX
    id: "971011237842399263",
    token:
      "Oehs6mH2F4jqKffsR3I9cO9TaarQ6zfwihWJOffXtad1ywvD2D-OqVDz30BGuoqgu4CX",
  });

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
      `Halo ${member}, Selamat datang di server ${member.guild.name}!! Harap terlebih dahulu membaca dan menaati semua <#914739553917624400> yang ada di server kita!!!
  Jika ada yang ingin ditanyakan, silahkan bertanya ke <@&968338987360083989> atau ke <@&968338987360083991>`
    )
    .setImage(`attachment://welcome-member.png`)
    .setFooter({ text: "discord.io/lohardlysmp" })
    .setTimestamp();

  try {
    welcomer.send({
      embeds: [embed],
      files: [attachment],
    });
  } catch (error) {
    console.error(error);
  }
});
