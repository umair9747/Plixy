# Plixy
Plixy is a discord bot which falls under the productivity category.It is made up from Discord.js and DiscordGO.It is recommended that you use this bot on a Cloud Server if you have a low end machine.Some of the feature have been seperated so that the overall load on your system/server can be reduced if you don't want some specific functions.
![alt text](https://simg.nicepng.com/png/small/645-6452762_discord-icon-for-free-download-on-ya-webdesign.png)
# Features

## Music
You can now play music from Plixy without any problems... wanna know how?
### >play songURL(for eg: Youtube,SoundCloud)
This command lets you Play/Add to queue any song of your choice directly from Youtube and Soundcloud, now it's time for a great VC night isn't it?
### >stop 
Didn't liked the song which is currently being played? Well, no worries just use this command and never have any interruptions in the VC night again !
### >skip
Can't wait for the next song?  no issues, just use this command and enjoy the next one !

## Anti server Advertising
Well looks like everyone have the same feeling when it comes to the annoying server advertising by bots/users in your server.. Not any more.. Plixy will directly remove any sort of link which has the frequently used keywords in it.
Some of the links Plixy blocks are: 
1.https://discordbots.org/servers/
2.http://discordbots.org/servers/
3.www.discordbots.org/servers/
4.https://discord.gg/
5.http://discord.gg/
6.www.discord.gg/
Looking for any other links which are not mentioned in here? No problem, Just fire up your favourite text editor and open the index.js file from the bot's folder, navigate to line no.130 and copy-paste the same code as used there and include the links of your choice.

## Useful Stats on the Console/Status
Want to know the stats of the servers the bot is running on? Well you can now check it out in the console when you start the bot
It gives info about: 
1.Number of Users
2.Number of channels
3.Number of guilds
Too lazy to open up the console every time?Well we knew it that's why we also included a pre written user activity which shows the number of servers and users directly on the game status area of the bot!

## Super exclusive feature (Only for locally running bots)
Wanna know what is?? 
It is .... *Drum rolls* **A home automation feature**... wait what? Yes! a home automation feature!
Let's Know more about it!
We are using http://johnny-five.io/ which is an  JavaScript Robotics & IoT Platform. What it can do is that it can communicate with IOT hardware (Arduino) from the ports of your local machine.So let's say if the server owner is going somewhere away from his native town for some work and he/she don't want their plants to be affected, what they can do is that they can set up a servo motor along with arduino and copy paste the code from http://johnny-five.io/examples/ and modify it in arduino.js in the Bot's folder . Once everything is set up now the owner just needs to use some specific command which the owners can set up by themselves to control the motor! This command should not be disclosed in public as it can turn out to be dangerous and the commands should be entered in a seperate channel with limited access (including the bot).

For now the only thing it can do is turn the LEDs on the arduino board ON and OFF.But once modified according to the owner's needs it can turn out to be a very useful feature.And since this is an optional feature it won't work till we initiate it using (node arduino.js) in the terminal, this will reduce the overall load on your system.

# Installation
First of all make sure that you have node.js  installed on your system.
You can download node.js through :https://nodejs.org/en/		
Once you are done with installing node.js you need to clone the git repo,
for this you should have git installed on your system, for installation visit:https://git-scm.com/downloads . 
Open up  your terminal and type git clone https://github.com/umair9747/Plixy/
it will clone the entire repo on your system, 
Now navigate to the directory where the repo was saved and then open up the config.json file, this is where the command prefix and the bot token is saved.We would however not recommend to change the command prefix.Go to // https://discordapp.com/developers/applications/ to add up the token for your bot (for further help regarding this visit : https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token )
Now open up your terminal and navigate to the directory where the bot's repo is saved.Now follow these commands: 
1. cd Plixy
2. npm install
3. node index.js (if there are any errors, you just need to see in the terminal which module is missing and enter the command 'npm install modulename' 
Voila! Plixy Bot is Up and running!
