const Discord = require("discord.js");

const TOKEN = "MzU2OTI5OTg3OTM0NDIxMDA0.DJigpg.AfnG_fnh6u4NPG6U5KaEh4qXDrE";

var bot = new Discord.Client();

bot.on("ready", function() {
	console.log("Ready");
});

bot.on("message", function(message) {
	if(message.author.equals(bot.user)) return;
	if(message.content === "hello") {
		message.channel.sendMessage("Hi there!");
	}
});

bot.login(TOKEN);