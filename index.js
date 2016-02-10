var Botkit = require("botkit");

var token = process.env.SLACK_TOKEN
if (!token) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: token
}).startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error(err);
  }
});


// Major Keys from http://khaledipsum.com/
var majorKeys = [
  "Bless up.",
  "They don't want us to win.",
  "We the best.",
  "They don't want us to eat.",
  "Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast, so we are going to enjoy our breakfast.",
  "Celebrate success right, the only way, apple.",
  "You smart, you loyal, you a genius.",
  "Hammock talk come soon.",
  "Give thanks to the most high.",
  "Congratulations, you played yourself.",
  "Don't ever play yourself.",
  "The key to more success is to have a lot of pillows.",
  "The ladies always say Khaled you smell good, I use no cologne. Cocoa butter is the key.",
  "Watch your back, but more importantly when you get out the shower, dry your back, it's a cold world out there.",
  "It's on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean.",
  "How's business? Boomin.",
  "They never said winning was easy. Some people can't handle success, I can.",
  "They will try to close the door on you, just open it.",
  "We don't see them, we will never see them.",
  "Every chance I get, I water the plants, Lion!",
  "In life there will be road blocks but we will over come it.",
  "To succeed you must believe. When you believe, you will succeed.",
  "Life is what you make it, so let's make it.",
  "To be successful you've got to work hard, to make history, simple, you've got to make it.",
  "A major key, never panic. Don't panic, when it gets crazy and rough, don't panic, stay calm.",
  "Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started.",
  "You see that bamboo behind me though, you see that bamboo? Ain't nothin' like bamboo. Bless up.",
  "In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key.",
  "Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel.",
  "Find peace, life is like a water fall, you've gotta flow.",
  "Let's see what Chef Dee got that they don't want us to eat.",
  "Lion!",
  "Surround yourself with angels.",
  "Major key, don't fall for the trap, stay focused. It's the ones closest to you that want to see you fail.",
  "The key to more success is to get a massage once a week, very important, major key, cloth talk.",
  "The key to success is to keep your head above the water, never give up.",
  "It's important to use cocoa butter. It's the key to more success, why not live smooth? Why live rough?",
  "They key is to have every key, the key to open every door.",
  "Learning is cool, but knowing is better, and I know the key to success.",
  "You do know, you do know that they don't want you to have lunch. I'm keeping it real with you, so what you going do is have lunch.",
  "Stay focused.",
  "I told you all this before, when you have a swimming pool, do not use chlorine, use salt water, the healing, salt water is the healing.",
  "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed.",
  "The key is to enjoy life, because they don't want you to enjoy life. I promise you, they don't want you to jetski, they don't want you to smile.",
  "The other day the grass was brown, now it's green because I ain't give up. Never surrender.",
  "The key is to drink coconut, fresh coconut, trust me.",
  "The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion!",
  "You see the hedges, how I got it shaped up? It's important to shape up your hedges, it's like getting a haircut, stay fresh.",
  "Let me be clear, you have to make it through the jungle to make it to paradise, that's the key, Lion!",
  "Always remember in the jungle there's a lot of they in there, after you overcome they, you will make it to paradise.",
  "I'm giving you cloth talk, cloth. Special cloth alert, cut from a special cloth.",
  "Look at the sunset, life is amazing, life is beautiful, life is what you make it.",
  "The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don't want you to eat."
];




var replyRandomKey = function(bot, message) {
	var index = Math.floor(Math.random() * majorKeys.length);
	var majorKey = "> " + majorKeys[index];
	bot.reply(message, majorKey);
}


var personaliseIntro = function(userID) {
	var username = "<@"+userID+">";
	var intros = [
		"Major :key: for "+username+"",
		""+username+", this is a special :key: just for you",
		"Hold up "+username+"! Major :key: for you",
		""+username+", you're in need of a major :key:",
		""+username+" listen up! Major :key: alert",
		"Wait wait wait. "+username+", major :key: for you",
	]
	var index = Math.floor(Math.random() * intros.length);
	return intros[index]
}






controller.on("direct_message", function(bot, message) {
	replyRandomKey(bot, message);
})

controller.on("bot_channel_join", function(bot, message) {
	var intro = "I'm here! Major :key: :key: :key: for the channel"
	bot.reply(message, intro);
	replyRandomKey(bot, message);
})

controller.on("direct_mention", function(bot, message) {
	var intro = personaliseIntro(message.user);
	bot.reply(message, intro);
	replyRandomKey(bot, message);
})

controller.on("mention", function(bot, message) {
	var intro = personaliseIntro(message.user);
	bot.reply(message, intro);
	replyRandomKey(bot, message);
})



controller.on("user_channel_join", function(bot, message) {
	var intro = "Welcome <@"+message.user+">! Major :key: for success in this channel - ";
	bot.reply(message, intro);
	replyRandomKey(bot, message);
})

controller.on("user_group_join", function(bot, message) {
	var intro = "Welcome <@"+message.user+">! Major :key: for success in this group -";
	bot.reply(message, intro);
	replyRandomKey(bot, message);
})



controller.hears(["major key", ":key:", 'key'], ["direct_message","direct_mention","mention","ambient"], function(bot, message) {
	var intro = "Yo <@"+message.user+">! You think you can give out the :key: to success but only I have the :key:. Listen up!";
	bot.reply(message, intro);
	replyRandomKey(bot, message);
})	