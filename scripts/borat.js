// Description:
//   Borat-ify your bot with borat. Commands set to work as if your bot was called borat.
//
// Dependencies:
//
// Configuration:
//  None
//
// Commands:
//  hubot quote - Quote a line from Borat.
//
// Author:
//   Jamesford

boratQuotes = [
  "What's up with it, Vanilla face? Me and my homie Azamat just parked our slab outside. We're looking for somewhere to post up our Black asses for the night. So, uh, bang bang, skeet skeet, nigga. Just a couple of pimps, no hos.",
  "This is Natalya. She is my sister. She is number-four prostitute in whole of Kazakhstan.",
  "Gipsy! Give me your tears! If you will not give them to me, I will take them from you!",
  "Jak sie masz? My name Borat. I like you. I like sex. Is nice!",
  "Urkin, not too much raping... Humans only!",
  "I will forgive Pamela, and I will go to California, with my friend Mr. Jesus, and we will take her!",
  "Mike Jared: I'm, er... recently retired... \nBorat: You are a retard?",
  "This is Orkin, the town rapist! Naughty, naughty!",
  "May George Bush drink the blood of every man, woman and child in Iraq!",
  "[narrating]: I had not come to Hollywood to fight with a man dressed as Hitler.",
  "[referring to woman in feminism group]: I could not concentrate on what this old man was saying.",
  "Kazakhstan is the greatest country in the world, all other countries are run by little girls. Kazakhstan is number one exporter of potassium, Other Central Asian countries have inferior potassium.",
  "[holding gun]: I feel like American movie star Dirty Harold... Go ahead, make my day, Jew...",
  "I bring iPod back from America and I get my neighbor iPod mini... because it is for girls!",
  "[ogling woman]: Very nice, very nice! How much?",
  "The lips of her vagine hang low like wizard's sleeve.",
  "Fuck off, Death!",
  "I loves the Pamela Andersons.",
  "Borat: You like me? You are my friend? \nDriving Instructor: Yes, I am your friend. \nBorat: You be my boyfriend? \nDriving Instructor: No, I'm not your boyfriend... okay, yeah, I guess I can be your boyfriend.",
  "We need somewhere to put our black asses, ni$&%r.",
  "I arrived in America's airport with clothings, U.S dollars and a jar of gypsy tears to protect me from AIDS.",
  "Borat: Do Jesus love my neighbor, Nusultan Tulyakbay? \nPentecostal church pastor: Yes, Jesus loves your neighbor. \nBorat [correcting him]: Nobody like my neighbor Nusultan Tulyakbay.",
  "Gypsy, who is this woman you have shrunk?",
  "I will look through your treasures, gypsy. Is this understood?",
  "Borat Sagdiyev: What kind of car can I buy that attract woman with hairless vagine? \nCar Dealership owner: That would be a Corvette.",
  "He is my neighbor, Nushuktan Tulyiagby, he is pain in my assholes. I get a window from a glass, he must get a window from a glass. I get a step, he must get a step. I get a clock-radio, he cannot afford. Great success!",
  "[narrating]: He insist we not fly, in case the Jews repeated their attack of 9/11.",
  "Quick children, smash the Jew egg!",
  "Dinner host: I called the police. \nBorat: Why? Did the retard escape?",
  "Pamela! I no find you attractive anymore! ... Not!",
  "You telling me the man who try to put a rubber fist in my anus was a homosexual?",
  "Although Kazakhstan a glorious country, it have a problem too: economic, social and Jew.",
  "Driving Instructor: In America, a woman can choose who she has sex with. \nBorat: Whaaaaat?",
  "We support your war of terror.",
  "My country send me to United States to make movie-film. Please, come and see my film. If it not success, I will be execute.",
  "Borat: What kind of dog is this? \nZookeeper: It's a tortoise. \nBorat: Is it a cat in a hat? \nZookeeper: No... it's a tortoise in a shell.",
  "When you chase a dream, especially one with plastic chests, you sometimes do not see what is right in front of you.",
  "This is my country of Kazakhstan. It locate between Tajikistan, and Kyrgyzstan, and assholes Uzbekistan.",
  "The only thing keeping me going was my dream of one day holding Pamela in my arms and making romance explosion on her stomach.",
  "My wife is dead? \n[long pause] \nHigh five!"
]

greetings = [
  "Jak sie masz!",
  "What's up, vanilla face?",
  "Dzien dobry!"
]

module.exports = function(robot) {
  robot.hear(/very nice/i, function(msg) {
    return msg.send("High five!!")
  });

  robot.hear(/success/i, function(msg) {
    return msg.send("Great success!!")
  });

  robot.hear(/ ?(hi|hey|yo|whats up|hello|greetings) borat/i, function(msg) {
    return msg.send(msg.random(greetings));
  })

  robot.respond(/quote/i, function(msg) {
    return msg.send(msg.random(boratQuotes));
  });
};