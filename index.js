
// dependencies

const Discord = require("discord.js");
const credentials = require("./credentials.js");
const yahooStocks = require("yahoo-stocks");

//make new bot

const bot = new Discord.Client();

//message to announce bot is functioning.

bot.on("ready", function () {
	console.log("I am ready!");
});

//make bot respond to the word hello

bot.on("message", function (message) {
	if (message.content === "hello") {
		message.reply("Well, hello there!");
	}

	//take the incoming message and make an array out of each word separating them at the spaces
	let contents = message.content.split(" ");

	//check for commands

	//Help command
	if (contents[0] === "!walter") {
		message.reply("```css\n" + "Walter's abilities\n\n* !stock - Look up the current price of a stock.\n* !weather - Give current temp in given zip code.\n" + "\n```");
	};

	//stock command
	if (contents[0] === "!stock") {
		message.reply("Ok I will look up " + contents[1] + "!");

		yahooStocks.lookup(contents[1]).then(function (response) {
			message.reply("```js\n" + response.currentPrice + "\n```");
		});
	}

});



//log bot in with its token

bot.login(token);

