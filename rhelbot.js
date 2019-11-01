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

// Register our event handlers (defined below)
// client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

//function onMessageHandler (target, context, msg, self) {
//  if (self) { return; } // Ignore messages from the bot

// Running commands from the bot
client.on('chat', (channel, userstate, message, self) => {
  if (self) return;
  const commandName = message.trim();

  if (commandName === '!dice') {
    const num = rollDice()
    client.say(`Rhelys`, `${userstate['display-name']} rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  }
  else {
    console.log(`* Unknown command ${commandName}`);
  }
});

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
