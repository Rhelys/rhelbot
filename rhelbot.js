const tmi = require('tmi.js');

// Reading secret token from a file
var fs = require('fs');
var oauth_token = fs.readFileSync(`./oauth.txt`, "utf8");

// Define configuration options
const opts = {
  identity: {
    username: 'Rhelbot',
    password: `${oauth_token}`
  },
  options: {
    debug: true,
  },
  channels: [
    'Rhelys',
    'Rhelbot'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Connect to Twitch:
client.connect();

// Validating that we've connected to the Twitch Chat IRC
client.on('connected', (address, port) => {
  console.log(`* Connected to ${address}:${port}`);
});

// Running commands from the bot
client.on('chat', (channel, userstate, message, self) => {
  if (self) return;
  const commandName = message.trim();

  // Rolling a D6 dice
  if (commandName === '!dice') {
    const num = rollDice()
    client.say(`${channel}`, `${userstate['display-name']} rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }

  else if (commandName === '!multiworld') {
    client.say('rhelys', `Muliworld is a variant of Zelda: OoT Randomizer where items are scattered amongst the games of all connected players`);
    console.log(`* Executed ${commandName} command`);
  }

  else if (commandName === '!commands') {
    client.say(`${channel}`, `Supported commands: !dice, !extralife, !multiworld, !players`)
    console.log(`* Executed ${commandName} command`);
  }
});


// Handling Mod/PowerUser commands through Rhelbot
client.on('chat', (channel, userstate, message, self) => {


});


/*
Functions to be utilized in the bot's commands
Covers all non-debug and non-message functionality for the commands
*/

// !dice
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
