const Discord = require("discord.js");

const Credentials = require("credentials.js");

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