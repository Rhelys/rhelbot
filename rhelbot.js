const tmi = require('tmi.js');

// Reading secret token from a file
var fs = require('fs');
var oauth_token = fs.readFileSync(`./oauth.txt`, "utf8");
console.log(oauth_token);

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
    'Rhelys'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Validating that we've connected to the Twitch Chat IRC
client.on('connected', (address, port) {
  console.log(`* Connected to ${addr}:${port}`);
});

// Connect to Twitch:
client.connect();

//function onMessageHandler (target, context, msg, self) {
//  if (self) { return; } // Ignore messages from the bot

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

 // Extra Life 2019 command
  else if (commandName === '!extralife' && channel === 'Rhelys') {
    client.say('Rhelys', `Extra Life unites thousands of gamers to play games and heal kids by fundraising for local Children's Miracle Network Hospitals across North America. Check out my profile here! https://bit.ly/2N7BPzE`)
  }
});

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
