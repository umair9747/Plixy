const Discord = require('discord.js');
const {
	prefix,
	token,
} = require('./config.json');
const superagent = require("superagent");
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
	console.log('Ready!');
	 // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} servers and ${client.users.size} users`);
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);
	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
		skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
		return;
	} 
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

 client.on("message", (message) => {
	  if (message.content.includes("https://discordbots.org/servers/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
  if (message.content.includes("http://discordbots.org/servers/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
  if (message.content.includes("www.discordbots.org/servers/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
	 if (message.content.includes("https://discord.gg/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
	 if (message.content.includes("http://discord.gg/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
	 if (message.content.includes("www.discord.gg/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
	 if (message.content.includes("discord.gg/")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
	 if (message.content.includes("discordbots.org/servers")) {
    console.log("deleted " + message.content + " from " + message.author)
    message.delete(1);
    message.channel.sendMessage("No links here! " + message.author)
  }
	 
 });
 client.on("message", (message) => {
	 const args = message.content.slice(prefix.length).split(' ');
     const command = args.shift().toLowerCase();
	 if (message.content.includes(">weather")){
		 if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
let request = require('request');
let apiKey = '5612695f1aca15a25234782d506268f5';
let city = args;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
	var temp = 0;;
    let messag = `It's ${weather.main.temp} degree fahrenheit in ${weather.name}!`;
    message.channel.sendMessage(messag)
  }
});
	 }
 });

client.on("message", (message) => {
	const args = message.content.slice(prefix.length).split(' ');
     const command = args.shift().toLowerCase();
	 if (message.content.includes(">random")){
	  if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
		 var randomValue = args[Math.floor(Math.random() * args.length)];
		 message.channel.sendMessage(randomValue)
	 }
});

client.on('guildMemberAdd',member =>{
	var role = member.guild.roles.find('name', 'Newbie');//change newbie to the rolename you want and make sure it is present in the server
	member.addRole(role)
});
client.on("message", (message) => {
	const swearWords = ["fucked", "faggot", "nigger", "fuck", "fucker", "fuckoff"];
if( swearWords.some(word => message.content.includes(word)) ) {
    message.delete(); 
	message.reply("Please don't use the banned words!!!");
}
});
client.on("message", (message) => {
	 if (message.content.includes(">invitation")){
		 message.channel.sendMessage("This feature hasn't been configured yet, please go to the line number 219 of index.js and add a shortened link of the server invitation link from https://goo.gl/")
	 }
});
client.on("message", async message => {
	if (message.content.includes(">nasa")){
	let {body} = await superagent
	.get(`https://api.nasa.gov/planetary/apod?api_key=zJDrpq9FrmzXgKBALtSjYOguyBjcTPfLE3Hg7G1s`);
	let imgembed = new Discord.RichEmbed()
	.setColor("#ff9900")
	.setTitle("Daily upload by NASA")
	.setImage(body.url);
	message.channel.send(imgembed);
	}
});
client.on("message", async message => {
	if(message.content.includes(">password")){
		let {body} = await superagent
	.get(`http://www.sethcardoza.com/api/rest/tools/random_password_generator/type:json`);
	let passwordembed = new Discord.RichEmbed()
	.setColor("#ff9900")
	.setTitle(body.complexity)
	.setDescription(body.password);
	message.channel.send(passwordembed);
	}
});
client.login(token);