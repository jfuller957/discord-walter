// dependencies
const Discord       = require("discord.js");
const credentials   = require("./credentials.js");
const yahooStocks   = require("yahoo-stocks");
const weather       = require("weather-js");

const API_KEY = flightToken;
const options = { write: __dirname + '/data'};
const qpx           = require('google-flights-api')(API_KEY, options);

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
        message.channel.send({embed: {
            color: 3447003,
            description: "Walter's commands:\n\n* !stock - Look up the current price of a stock.\n* !weather - Give current temp in given zip code.\n* !convert - Convert currency between USD CAD and EUR.\n"
        }});
    };

    // stock command
    if (contents[0] === "!stock") {
        message.reply("Ok I will look up " + contents[1] + "!");

        yahooStocks.lookup(contents[1]).then(function (response) {
            message.channel.send({embed: {
            color: 3447003,
            description: JSON.stringify(response.currentPrice)
        }});
    });
    };

    // weather command
    if (contents[0] === "!weather") {
          
        // options available are search by zipcode and select degree type: F or C 
       weather.find({search: contents[1], degreeType: 'F'}, function(err, result) {
            if(err) console.log(err);
        
            message.reply(JSON.stringify(result, null, 2));
            console.log(JSON.stringify(result, null, 2));
        });
    };

    // money command
    if (contents[0] === "!convert") {

        // place current rates in array
        let rates = [0.83675, 1.23331, 0.81070, 0.67835, 1.19490, 1.47368];

        // define conversion rates
        let USDEUR = rates[0];
        let USDCAD = rates[1];
        let CADUSD = rates[2];
        let CADEUR = rates[3];
        let EURUSD = rates[4];
        let EURCAD = rates[5];

        // initialize result
        let result = 0;

        // conversion function
        function convert (amount, convertFrom, convertTo) {
            if (convertFrom === "USD" && convertTo === "EUR") {
                result = amount * USDEUR;
            } else if (convertFrom === "USD" && convertTo === "CAD") {
                result = amount * USDCAD;
            } else if (convertFrom === "CAD" && convertTo === "USD") {
                result = amount * CADUSD;
            } else if (convertFrom === "CAD" && convertTo === "EUR") {
                result = amount * CADEUR;
            } else if (convertFrom === "EUR" && convertTo === "USD") {
                result = amount * EURUSD;
            } else if (convertFrom === "EUR" && convertTo === "CAD") {
                result = amount * EURCAD;
            } else {
                message.reply("Invalid input!");
            }
            console.log(result);
            message.reply(result);
        }        
        convert(contents[1], contents[2], contents[3]);
    };
    // flight command
    if (contents[0] === "!flight") {
     
    const q = {
       adultCount: contents[1], 
       maxPrice: contents[2], 
       solutions: contents[3], 
       origin: contents[4],
       destination: contents[5], 
       date: contents[6]
    };
    qpx.query(q).then((data) => {
      //data looks like: [ { airline: 'SK', price: 'EUR71.10' } ]
    }).catch(console.error);
    };
});

// log bot in with its token
bot.login(token);