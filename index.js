
// dependencies
const Discord = require ("discord.js");
const credentials = require ("credentials.js");

// Make a new bot
var bot = new Discord.Client ();

// Bot is online
bot.on ("ready", function () {
	console.log ("Ready");
});

// Bot is listening to messages
bot.on ("message", function(message) {
	// This is the bot talking, it will ignore this.
	if (message.author.equals(bot.user)) return;

	// Simple test message
	if (message.content === "hello") {
		message.channel.sendMessage ("Hi there!");
	};
});

bot.login (TOKEN);