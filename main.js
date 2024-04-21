const { REST, Routes, Message } = require('discord.js');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const wait = require('node:timers/promises').setTimeout;

//const BotURI = 'http://localhost:5001/api/v1';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();



client.on('ready', () => { console.log(`Logged in as ${client.user.tag}!`); }); //client tagline
//client.on(Events.InteractionCreate, interaction => { console.log(interaction); }); //interaction logging in console
client.on(Events.InteractionCreate, interaction => { 
    if(!interaction.isChatInputCommand()) return;
    //console.log(interaction);
});



client.on(Events.InteractionCreate, async interaction => {
	function logRecursive(object){
		for (key in object){
		var value=object[key];
		if(typeof value === 'object'){
		   logRecursive(value);
		}else{
			interaction.editReply(value);
		}
	  }
	}

	if (!interaction.isChatInputCommand()) return;
	
	const command = interaction.client.commands.get(interaction.commandName);
	
    if (interaction.commandName === 'ping'){ await interaction.reply('Pong~'); };
	
	if (interaction.commandName === 'generate'){
		await interaction.deferReply();
		await wait(4000);
		const proompt = interaction.options.getString('inference');
		let BotRQ = await fetch('http://127.0.0.1:5001/api/v1/generate', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				max_length: 256,
				prompt: proompt,
				n: 2
			})
		}).then(res => {return res.json()})
		.catch(err => console.log(err))

		logRecursive(BotRQ);
	};
});




client.login(token);