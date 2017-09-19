// dependencies
const Discord     = require("discord.js");
const credentials = require("./credentials.js");
const yahooStocks = require("yahoo-stocks");
const weather    = require("weather-js");

// make new bot
const bot = new Discord.Client();

// message to announce bot is connected to discord.
bot.on("ready", function () {
    console.log("I am ready!");
});

// listen for commands
bot.on("message", function (message) {
    // make bot respond to the word hello
    if (message.content === "hello") {
        message.reply("Well, hello there!");
        };

    // take the incoming message and make an array out of each word separating them at the spaces
    let contents = message.content.split(" ");

    // shows all of walters commands
    if (contents[0] === "!commands") {
        message.reply("```css\n" + "Walter's commands:\n\n* !stock - Look up the current price of a stock.\n* !weather - Give current temp in given zip code.\n" + "\n```");
    };

    // stock command
    if (contents[0] === "!stock") {
        message.reply("Ok I will look up " + contents[1] + "!");

        yahooStocks.lookup(contents[1]).then(function (response) {
            message.reply("```css\n" + response.currentPrice + "\n```");
        });
    };

    // weather command
    if (contents[0] === "!weather") {
        var weather = require('weather-js');
          
        // search:     location name or zipcode 
        // Options available are search by location name or zipcode and select degree type: F or C 
        weather.find({search: contents.slice(1, 4).join(" "), degreeType: 'F'}, function(err, result) {
            if(err) console.log(err);
        
            message.reply(JSON.stringify(result, null, 2));
            console.log(JSON.stringify(result, null, 2));
        });
    };

});

// log bot in with its token
bot.login(token);