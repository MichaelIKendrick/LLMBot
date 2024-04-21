const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [
    {
        name: 'ping',
        description: 'Replies with a Pong~!'
    },
    {
        name: 'generate',
        description: 'Returns bot thoughties',
        options: [
        {
            name: 'inference',
            description: 'The user request',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    }
];

// Construct and prepare an instance of the REST module
const rest = new REST( { version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put( Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();