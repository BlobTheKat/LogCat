require("dotenv").config()
var BigNumber = require("./bignumber.min.js")
const fs = require("fs")
or = (v, f) => v===undefined?f:v
var t = this;
function link(vname, file){
  var c = JSON.parse(fs.readFileSync(file))
  Object.defineProperty(t,vname,{
    get:()=>{
      setImmediate(()=>{fs.writeFileSync(file,or(JSON.stringify(c),null))});
      return c
    },
    set: a => (c=a,fs.writeFileSync(file,or(JSON.stringify(c),null)))
  })
}
const ex = require("express");
const app = ex()
app.get("/", (req, res) => {
  res.end("Nothing here...");
})
setInterval(function(){
  if(rank.profile!=Math.floor((new Date().getTime())/900000)%12){
    rank.profile=Math.floor((new Date().getTime())/900000)%12;
    client.user.setAvatar("https://bitfont.matreiner.repl.co/"+rank.profile+".png");
    saveRank();
  }
}, 10000)
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  logch = client.guilds.cache.find(a => a.id="699267121359749180").channels.cache.find(a => a.name == "logs")
  client.user.setActivity("Super cat Tales!", { type: "PLAYING" });
});
var mail = {};
fs.readFile("mail.json", (b,a)=>{mail = JSON.parse(a)})
function saveMail(){
  fs.writeFile("mail.json", JSON.stringify(mail), ()=>{})
}
var rank = {};
fs.readFile("rank.json", (b,a)=>{
  rank = JSON.parse(a);
  for(var i in rank){
    for(var t of ["clicks", "cpc", "cps"]){
      rank[i][t] = Object.assign(BigNumber(0), rank[i][t] || BigNumber(0));
    }
  }
})
var sav;
function saveRank(){
  if(sav) return
  for(var i in rank){
    for(var t of ["clicks", "cpc", "cps"]){
      rank[i][t] = Object.assign({}, rank[i][t] || BigNumber(0));
    }
  }
  var z = JSON.stringify(rank)
  for(var i in rank){
    for(var t of ["clicks", "cpc", "cps"]){
      rank[i][t] = Object.assign(BigNumber(0), rank[i][t] || BigNumber(0));
    }
  }
  sav = 1;
  fs.writeFile("rankBackup.json", z, ()=>{setTimeout(fs.writeFileSync.bind(fs,"rank.json", z),100);sav=0;})
}
let meow = "meow", meows = [
  "`meow`",
  `\`\`\`{
  "command": "meow",
  "result": "meow",
  "meow": true,
  "purr": 999999
}\`\`\``,
  "`MEEOW!`",
  "`Miaou`",
  "`Meeeeooooowwwwww!!!!!`",
  "`<meow meow='meow'>meow</meow>`",
  "`Meow!`",
  "*__**meow**__*"
]
var rolesAbbr = {
  "Moderator": "Mod",
  "Programmer": "Pro",
  "Muted": "Mtd",
  "LogCat": "Me!"
}
function fn(num){
  return (''+num)+([null,"st","nd","rd"][(''+num)[(''+num).length-1]]||"th");
}
var bMath = {
  "plus": (a,b) => a+b,
  "minus": (a, b) => a-b,
  "times": (a,b) => a*b,
  "div": (a, b) => a/b,
  "pow": (a, b) => a**b,
  "+": (a,b) => a+b,
  "-": (a, b) => a-b,
  "*": (a,b) => a*b,
  "x": (a,b) => a*b,
  "/": (a, b) => a/b,
  "^": (a, b) => a**b,
  "**": (a, b) => a**b,
  "%": (a, b) => a%b,
  "mod": (a, b) => a%b,
  "intdiv": (a, b) => Math.floor(a/b)
}
var reqXp = (lvl) => 250 + 150*lvl
var giveXp = (id, xp) => {
  setupRank(id)
  rank[id].xp+=xp;
  while(rank[id].xp > reqXp(rank[id].level)){
    rank[id].xp -= reqXp(rank[id].level);
    rank[id].level += 1;
  }
  return rank[id]
}
var setupRank = (id) => {
  if(!rank[id]){rank[id] = {}}
  rank[id] = {
    level: rank[id].level||0,
    xp: rank[id].xp||0,
    eggs: rank[id].eggs?rank[id].eggs:[],
    energy: rank[id].energy||0,
    clicks: rank[id].clicks||BigNumber(0),
    cps: rank[id].cps||BigNumber(0),
    cpc: rank[id].cpc||BigNumber(1),
    lcc: rank[id].lcc||Math.floor(Date.now()/1000)*1000,
    count: rank[id].count||[],
    confirm: rank[id].confirm||"NULL"
  }
}
var help = {
  "help": ["<command_name: optional name>", "will show command help"],
  "simonsays": ["<text>", "bot will repeat what you ask him. Please don't abuse"],
  "calc": ["<a: number> <operation: plus/minus/times/div/pow/mod/intdiv> <b: number>", "calculate som math!"],
  /*"mail": ["<recipient> <subject> <content>", "send a (public) mail to someone. WARNING: this will ping them"],
  "getmail": ["<mailNumber>", "view your mail"],
  "᠎᠎getmail": ["","view your 10 most recent mails (same as `/getmail page 1`)"],
  "᠎getmail": ["page <pageNumber>", "view a list of your mail. (PageNumber 5 = mail from number 41 to 50)"],*/
  "kick": ["<user: mention> <reason: Text>", "kick someone. only for mods"],
  "ban": ["<user: mention> <reason: Text>", "ban someone. only for mods"],
  "meow": ["<meow: meow>", "meow"],
  "rank": ["", "view your rank card (not MEE6)"],
  "charge": ["","charge a battery for energy"],
  "discard": ["<optional amount: number>","get rid of charged batteries"],
  "batteries": ["", "find out how many batteries you have"],
  "wipe": ["<optional msgcount: number | 20>", "clear the last <*msgcount*> messages. Works in any channel. If you are not mod, only clears your messages."]
}
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'bot-commands');
  if (!channel) return;
  channel.send(`Someone just joined the server. Everyone welcome ${member}!`);
});
var premeow = (i,b)=>(b?" ":"")+"`Meow!`"+(b?"":" ")
var times = {
  [null]: 1000,
  "ms": 1,
  "us": 0.001,
  "µs": 0.001,
  "ns": 0.000001,
  "s": 1000,
  "m": 60000,
  "h": 3600000,
  "hr": 3600000,
  "min": 60000,
  "d": 86400000,
  "day": 86400000,
  "mn": 2635200000,
  "month": 2635200000,
  "mth": 2635200000,
  "y": 31557600000,
  "yr": 31557600000,
  "year": 31557600000
}
var ems = [];
var wl = ["c"]
var logch = {send: () => console.log("Bot not ready!")};
function log(title, fds, col){
  var ar = Object.assign([], arguments)
  if(ar.length%2){
    ar.push("")
  }
  var fds = ar.slice(1,-1);
  var col = ar[ar.length-1] || "#2f3136";
  var f = []
  for(var i = 0;i<fds.length;i+=2){
    f.push({name:fds[i].replace(/-/,"").replace(/^\\-/,"-"),value:fds[i+1],inline:fds[i][0]=="-"});
  }
  logch.send(new Discord.MessageEmbed().setColor(col).setTitle(title).setAuthor("LogCat > Logs").addFields(...f).setTimestamp())
}
log.toString = () => "function log(title[, key, value], col) { [native code] }";
client.on("presenceUpdate", (oldMember, newMember) => {
  var mem = newMember.guild.members.cache.find(a => a.id == newMember.userID);
  log("info", "type", "statusChange", "user", "<@"+newMember.userID+">","status",newMember.status);
  if(newMember.status == "online"){
    newMember.guild.channels.cache.find(a => a.name == "bot-commands").send("<@"+newMember.userID+"> is now online!")
  }else if(newMember.status == "offline"){
    newMember.guild.channels.cache.find(a => a.name == "bot-commands").send((mem.nickname||mem.username)+" left for real life!")
  }
});

client.on('message', message => {
  if(message.author.id=="701705058877702177"){return}
  if(hM(message)) return
  if(message.channel.type=="dm"){hDm(message);return}
  if(message.channel.name=="games"){hG(message)}
  giveXp(message.author.id, Math.floor(Math.random()*10))
  if(message.guild.name!="PicFunk"||(message.content[0]!="/" && !wl.includes(message.content))){return}
  if(message.channel.name!="bot-commands"){return}
  var reply = (m,pm=true)=>{return message.channel.send((pm?premeow():"")+m)};
  var str=message.content.slice(1);var w=str.match(/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g);str=str.replace(/undefined/g,`u᠎ndefined`).replace(/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g,"undefined");var z=0;var q=str.split(" ");q.forEach(function(i,n){if(i=="undefined"){q[n]=(w[z]||"undefined").replace(/(^["']|["']$)/g,"");z++}});
  params = q.slice(1);
  switch(q[0]){
    case "help":
    if(!params.length){
      var p ="";
      for(var i in help){
        p+="\n`/"+i+" "+help[i][0]+"` - _"+help[i][1]+"_"
      }
      reply("Help:"+p,false);
    }else{
      if(!help[params[0]]){reply("No such command: "+params[0]);return}
      reply("Help for: "+params[0]+" `"+help[params[0]][0]+"` - _"+help[params[0]][1]+"_",false);
    }
    return;
    case "calc":
    reply("The result is: " + (bMath[params[1]]||function(){return("Invalid operation")})(+params[0], +params[2]))
    return;
    case "mail":
    var user = massage.mentions.members.first().user.id;
    var subject = params[1];
    var cont = params.slice(2).join(" ");
    if(!mail[user]){mail[user]=[]};
    mail[user] = [[subject,cont,Date().split("000 (")[0]], ...mail[user]];
    saveMail();
    reply("Email to "+user + " (Recipient: use `/getmail 1` to view the mail)");
    return;
    case "getmail":
    if(!params.length){
    var x = [...(mail[message.author.id]||[])];
    if(!x.length){return "You do not have any mail!";return}
    x.forEach(function(itm, ind){
      x[ind] = "`"+(+ind+1)+".` Mail from the " + itm[2] + " with subject: "+itm[0];
    })
    if(x.length<11){
      reply(x.join("\n")+"\nTo see a specific mail, enter `/getmail <mailNumber>`");
    }else{
      reply("Page `1` of `"+Math.ceil(x.length/10)+"`\n"+x.slice(-10).join("\n")+"\nTo see the rest of your mail, type `/getmail page <pageNumber>`\nTo see a specific mail, enter `/getmail <mailNumber>`");
    }
    }else{
      if(params[0]=="page"){
        var x = [...(mail[message.author.id]||[])];
        if(!x.length){return "You do not have any mail!";return}
        x.forEach(function(itm, ind){
          x[ind] = "`"+(+ind+1)+".` Mail from the " + itm[2] + " with subject: "+itm[0];
        })
        if(x.length<11){
          reply(x.join("\n")+"\nTo see a specific mail, enter `/getmail <mailNumber>`");
        }else{
          reply("Page `1` of `"+Math.ceil(x.length/10)+"`\n"+x.slice(-params[2]*10, (10-params[2]*10)).join("\n")+"\nTo see the rest of your mail, type `/getmail page <pageNumber>`\nTo see a specific mail, enter `/getmail <mailNumber>`");
        }
      }else{
        var m = mail[message.author.id]||[];
        if(!m.length){reply("You do not have a mail number `"+params[0]+"`!");return;}
        m=m[params[0]-1]
        reply("Mail number `"+params[0]+"`:\n`Subject:`"+m[0]+"\n`Content:`"+m[1]+"\n`Sent on:`"+m[2]);
      }
    }
    return;
    case "kick":
    if(!message.member.roles.cache.find(role => role.name === "Moderator")){reply("You don't have permission to kick anyone!");return}
    var member = message.mentions.members.first();
    //var member = message.guild.member(user);
    if(!member){
      reply("No one to kick...")
      return
    }
    member.kick(params[1]).then(a => {
      reply("Successfully kicked "+member.user.username)
    }).catch(e => {
      reply("Couldn't kick "+member.user.username)
    })
    return;
    case "ban":
    if(!message.member.roles.cache.find(role => role.name === "Moderator")){reply("You don't have permission to kick anyone!");return}
    var member = message.mentions.members.first()
    if(!member){
      reply("No one to ban...")
      return
    }
    member.ban({reason: params[1]}).then(a => {
      reply("Successfully banned "+member.user.username)
    }).catch(e => {
      reply("Couldn't ban "+member.user.username)
    });
    return;
    case "mute":
    var roles = [];
    message.guild.member(message.author)._roles.forEach(a=>{
      roles.push(message.guild.roles.cache.get(a).name)
    })
    if(!roles.includes("Moderator")){reply("You don't have permission to mute anyone!");return}
    var member = message.mentions.members.first();
    member.roles.add('699995279516106864');
    reply("Muted <@"+member.id+">");
    var time = parseInt(params[1])*times[(params[1].match(/[a-zA-Z]+/g)||["s"])[0]]
    setTimeout(()=>{
      member.roles.remove('699995279516106864');
      reply("Unmuted <@"+member.id+">")
    },time)
    return;
    case "debug":
    reply("That's not yours to touch!")
    return;
    case "meow":
    giveXp(message.author.id, 1);
    reply(meows[Math.floor(Math.random()*8)],false)
    return
    case "emulate":
    reply("Not supported yet!")
    return;
    case "kittn":
    message.channel.send("",{files:["https://kittn.matreiner.repl.co/ktn_icon.png?pass=ecce3"]});
    return;
    case "abandoncharge":
    setupRank(message.author.id);
    var rk = rank[message.author.id];
    try{
      clearInterval(rk.i)
      delete rk.i;
      rk.charging=false;
      reply("Charging abandoned!")
      rk.energy=Math.floor(rk.energy);
    }catch(e){}
    return;
    case "batteries":
    setupRank(message.author.id);
    var rk = rank[message.author.id]
    reply("Your batteries: `"+Math.floor(rk.energy)+"`"+(rk.charging?" PLUS `1` battery charging: `"+Math.floor((rk.energy%1)*1000)/10+"`%":""))
    return
    case "charge":
    setupRank(message.author.id);
    var rk = rank[message.author.id]
    if(rk.charging){
      reply("A battery is already charging!");
      return;
    }
    if(rk.energy >= rk.level){
      reply("Your battery slots are full!");
      return;
    }
    const slots = 32;
    const step = 0.25;
    (async () => {
      reply("Charging battery "+Math.floor(rk.energy+1))
      var f = await message.channel.send("`["+" ".repeat(slots)+"] 0%`")
      var p = 0;
      rk.charging = true;
      rk.i= setInterval(() => {
        p+=step;
        f.edit(`\`[${"#".repeat(p)+" ".repeat(Math.ceil(slots-p))}] ${Math.floor(1000*p/slots)/10}%${p>=slots?" FULLY CHARGED":""}\``)
        rk.energy += step/slots;
        saveRank();
        if(p >= slots){
          clearInterval(rk.i);
          delete rk.i;
          rk.charging = false;
          message.channel.send("<@"+message.author.id+">, Your `"+fn(rk.energy)+"` battery has finished charging!")
        }
      }, 2000);
    })()
    return;
    case "discard":
    setupRank(message.author.id);
    var rk = rank[message.author.id];
    var t = rk.energy;
    rk.energy = Math.max(t-(params[0]||1), 0)
    reply("Successfully discarded of "+(t-rk.energy)+" batteries")
    saveRank();
    return;
    case "rank":
    message.author = (message.mentions.members.first() || {user: message.author}).user;
    setupRank(message.author.id)
    saveRank()
    var rankStat = rank[message.author.id];
    var roles = [];
    message.guild.member(message.author)._roles.forEach(a=>{
      roles.push(message.guild.roles.cache.get(a).name)
    })
    roles.forEach((a, b)=>{
      roles.splice(b,1)
      if(rolesAbbr[a]){
        roles[b] = rolesAbbr[a]
      }
    })
    message.channel.send("",{files:[`https://l.matreiner.repl.co/card/${message.author.username}/${roles.join(", ")||"%20"}/${rankStat.level}/${rankStat.xp}/${reqXp(rankStat.level)}/img.png`]})
    return;
  }
  message.channel.send("Invalid command! For help on commands, try /help");
});
function easter(id, eggname){
  if(!rank[id].eggs.includes(eggname)){
      rank[id].eggs.push(eggname)
      return true
    }else{
      return false
    }
    saveRank()
}
function hDm(message){
  var reply = (m,pm=true,pma=false)=>{return message.channel.send((pm?premeow():"")+m+(pma?premeow(undefined,true):""))};
  if(message.author.id=="701705058877702177"){return}
  switch(message.content.toLowerCase()){
    case "your token is...":
    reply("`NO NO NO!!!`")
    return
    case "lvlup":
    setupRank(message.author.id)
    if(easter(message.author.id, "lvlup")){
      reply("Egg found! You got 100 points!")
      giveXp(message.author.id, 100);
    }else{
      reply("You already found my egg! No extra points for you!")
    }
    return
  }
  reply("Please don't dm bots unless it's important",false,true);
}
client.login(process.env.BOT_TOKEN);
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.ask = async (inp) => {
  return new Promise(resolve => {
    rl.question(inp||"",resolve)
  })
}
x=0,t=40;
/*process.exit = () => "\u001b[31;1mprocess.exit has been disabled\u001b[0m"
process.kill = () => "\u001b[31;1mprocess.kill has been disabled\u001b[0m"
console.log("\u001b[2147483647A")
w=setInterval(async () => {
  if(x==t){
    x=0
  }
  if(x>t){
    clearInterval(w);
    console.clear()
    console.log("Logged in as \u001b[36mLogCat\u001b[38;5;208m#7599\u001b[0m!")
    while(true){
      u = await console.ask()
      if(u==process.env.admin){
        console.log("\u001b[32;1mAcces Granted!\u001b[0m")
        break;
      }
      console.log("\u001b[31;1mIncorrect Password! Try again\u001b[0m")
    }
    while(true){
      u = await console.ask()
      try{
        console.log(eval(u))
      }catch(e){
        console.log("\u001b[31;1m"+e+"\u001b[0m")
      }
    }
    return
  }
  console.log("\u001b[2A["+("#".repeat(x))+(" ".repeat(t-x))+"]");
  x++;
}, 20)*/
function awardClick(id, clicks){
  setupRank(id);
  if(clicks==undefined){clicks=rank[id].cpc}
  rank[id].clicks = rank[id].clicks.plus(clicks)
  var diff = Date.now() - rank[id].lcc;
  rank[id].lcc = Date.now();
  diff = Math.max(diff, 0);
  diff /= 1000;
  rank[id].clicks = rank[id].clicks.plus(rank[id].cps.times(diff));
  saveRank();
  rank[id].clicks = BigNumber(rank[id].clicks.toFixed(6));
  return rank[id].clicks;
}
var products = [
  [5, "LTCK", 0.2, false],
  [8, "STRH", 0.5, true],
  [5e2, "SPCK", 20, false],
  [8e2, "WRST", 50, true],
  [5e4, "MGCK", 2e3, false],
  [8e4, "ATPG", 5e3, true],
  [5e6, "UTCK", 2e5, false],
  [8e6, "IRNH", 5e5, true],
  [5e8, "QZCK", 2e7, false],
  [8e8, "HDHD", 5e7, true],
  [5e10, "ATCL", 2e9, false],
  [8e10, "ACH1", -1, true],
  [8e10, "ATPR", 5e9, true],
  [5e12, "CHEG", 2e11, false],
  [8e12, "NDJS", 5e11, true],
  [5e14, "PLKT", 2e13, false],
  [8e14, "BHPS", 5e13, true],
  [5e16, "WHCK", 2e15, false],
  [8e16, "EXHD", 5e15, true],
  [5e18, "MTCK", 2e17, false],
  [8e18, "MTHD", 5e17, true],
  [5e20, "STEP", 2e19, false],
  [8e20, "LEAP", 5e19, true],
  [5e22, "GBCK", 2e21, false],
  [8e22, "GBLF", 5e21, true],
  [5e24, "RICH", 2e23, false],
  [8e24, "POOR", 5e23, true],
  [5e26, "ACH2", -1, false],
  [5e26, "NTYT", 2e25, false],
  [8e26, "OVPW", 5e25, true],
  [5e28, "INF1", 1.1, false, true],
  [8e28, "INF2", 1.1, true, true],
  [5e32, "INF3", 2, false, true],
  [8e32, "INF4", 2, true, true]
];
var names = {
  "LTCK": "Little Clicker",
  "STRH": "Stronger Hand",
  "SPCK": "SuperClicker",
  "WRST": "Wrist Adapter",
  "MGCK": "MegaClicker",
  "ATPG": "Anti-Pressure Gloves",
  "UTCK": "UltraClicker",
  "IRNH": "Iron hand",
  "QZCK": "Quatz Clicker",
  "HDHD": "Hydraulic Hand",
  "ATCL": "Atomic Clock",
  "ACH1": "Just for the achievement",
  "ATPR": "Antimatter Presser",
  "CHEG": "Cheat Engine",
  "NDJS": "Node.js Injection",
  "PLKT": "Planck Time",
  "BHPS": "Black Hole Pusher",
  "WHCK": "Wormhole Clicker",
  "EXHD": "Exotic Hand",
  "MTCK": "Megathlon Clicker",
  "MTHD": "Megathlon Hand",
  "STEP": "On small step for man",
  "LEAP": "One giant leap for mandkind",
  "GBCK": "Goodbye clicks!",
  "GBLF": "Goodbye life!",
  "RICH": "You are rich!",
  "POOR": "You are poor!",
  "ACH2": "Just for the achievement",
  "NTYT": "Infinity mode?",
  "OVPW": "Overpowered",
  "INF1": "Infinity Mode!",
  "INF2": "Infinity Mode!",
  "INF3": "Infinity Mode!",
  "INF4": "Infinity Mode!"
}
const inc = 1.05;
function hG(message){
  setTimeout(message.delete.bind(message), 30000)
  var rembed = async (col, tit, auth, desc, ticon, ricon, ftr, ftimg, ...fds)=>{
    return new Promise((r) => {
      message.channel.send(new Discord.MessageEmbed().setColor(col).setTitle(tit)
      .setAuthor(auth)
      .setDescription(desc)
      .setThumbnail(ricon)
      .addFields(...fds)
      .setImage(ticon)
      .setFooter(ftr, ftimg)).then(a=>{setTimeout(a.delete.bind(a),30000);r(a)})
    })
  };
  function iClick(){
    var id = message.author.id;
    var d = awardClick(id)
    rembed("#0099ff", "Click!", "LogCat > Games", "Clicked!", "", "", "Tip: message `c` (without the `/`) to click faster", "", {name: "Clicks so far:", value:d.integerValue()+" clicks"})
  }
  if(message.content == "c"){iClick();return}
  if(message.content[0]!="/")return
  var str=message.content.slice(1);var w=str.match(/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g);str=str.replace(/undefined/g,`u᠎ndefined`).replace(/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g,"undefined");var z=0;var q=str.split(" ");q.forEach(function(i,n){if(i=="undefined"){q[n]=(w[z]||"undefined").replace(/(^["']|["']$)/g,"");z++}});
  params = q.slice(1);
  
  for(var i in products){
    products[i][0] = BigNumber(products[i][0])
    products[i][2] = BigNumber(products[i][2])
  }
  
  switch(q[0]){
    case "click":
    iClick()
    break;
    case "shop":
    var id = message.author.id;
    setupRank(id)
    var rk = rank[id]
    var c = products.length;
    var prices = [];
    for(var i in products){
      prices[i] = products[i][0].times(BigNumber(inc).pow(rk.count[i]||0))
    }
    for(var i of [...products].reverse()){
      c--;
      if(!rk.clicks.lt(prices[c])) break
    }
    var itms = [];
    var page = (parseInt(params[0]) || Math.floor(c/5)+1)-1;
    for(var i = 0;i<5;i++){
      var f = products[page*5+i];
      if(!f) break;
      itms.push({name:"["+(rk.count[(page*5+i)-1]||!(page*5+i)?f[1]:":lock:")+"] "+names[f[1]],value:"You have: `"+(rk.count[page*5+i]||0)+"`,Price: `"+prices[page*5+i].toString().replace(/(?<=\.\d)\d*/,"")+"`, Gives: `+"+f[2]+(f[3]?"combo":"cps")+"`"})
    }
    rembed("#ff9900", "Shop", "LogCat > Games", "Here's a list of available items:\nTo buy an item, use `/buy <itm_id>`\nTo see more items, try `/shop <page_id>`\nYou have: `"+rk.clicks.integerValue()+"` Clicks\n","","","Page "+(page+1)+" of "+Math.floor(products.length/5+1),"",...itms)
    return;
    case "buy":
    if(params.length==0) return
    var i = Math.max((+params[0] || products.indexOf(products.filter(a => a[1] == (params[0]||"").toUpperCase())[0])+1)-1,0);
    i = Math.min(products.length-1, Math.max(i, 0))
    var a = Math.min(+(params[1]||"0") || 1, 100);
    if((params[1]||"1").toLowerCase().match(/max/)){a = 100}
    var id = message.author.id;
    awardClick(message.author.id,0)
    var rk = rank[id];
    var price;
    var c = BigNumber(rk.clicks)
    var s = BigNumber(rk.cps);
    var b = BigNumber(rk.cpc);
    if(!rk.count[i-1]&&i){
      rembed("#ff0000", "Shop > Purchase", "LogCat > Games", "Item locked! Purchase previous item first ("+(products[i-1]||[0,"ERROR"])[1]+")")
      return;
    }
    for(var t = 0;t < a;t++){
      price = products[i][0].times(BigNumber(inc).pow(rk.count[i]||0));
      if(rk.clicks >= Math.ceil(price)){
        rk.clicks = rk.clicks.minus(price);
        (++rank[id].count[i])||(rank[id].count[i]=1);
        if(products[i][3]){
          if(products[i][4]){
            rk.cpc = rk.cpc.times(products[i][2])
          }else{
            rk.cpc = rk.cpc.plus(products[i][2])
          }
        }else{
          if(products[i][4]){
            rk.cps = rk.cps.times(products[i][2])
          }else{
            rk.cps = rk.cps.plus(products[i][2])
          }
        }
      }else{
        break;
      }
    }
    saveRank()
    if(t==0 && a>0){
      rembed("#ff0000", "Shop > Purchase", "LogCat > Games", "You don't have enough money for that item! You need "+BigNumber(price).minus(rk.clicks).integerValue() + " more clicks!")
      return;
    }
    rembed("#0000ff", "Shop > Purchase", "LogCat > Games", "Successfully bought "+products[i][1]+" x"+t+" for "+c.minus(rk.clicks).integerValue()+" clicks!", "", "", "tip: bulk-buy with /buy <itmcode> <amount> or buy max with /buy <itmcode> max\nLevel: "+rk.count.length,"",{name:"Clicks",value:"`"+c.integerValue()+"` > `"+rk.clicks.integerValue()+"`"},{name: "Clicks/sec",value:"`"+s+"` > `"+rk.cps+"`"},{name:"Click combos",value:"`"+b+"` > `"+rk.cpc+"`"})
    return;
    case "bal":
    awardClick(message.author.id,0)
    var rk = rank[message.author.id];
    var temp = {};
    //(col, tit, auth, desc, ticon, ricon, ftr, ftimg, ...fds)
    rembed("#00ff00", "Balance", "LogCat > Games", "Your balance:","","","Level: "+(temp.c=rk.count.length),"",{name:"Clicks",value:""+rk.clicks.integerValue()},{name: "Clicks/sec",value:""+(temp.s=rk.cps)},{name:"Click combos",value:""+(temp.b=rk.cpc)}).then(a => {
      var i = 0;
      var t = setInterval(() => {
        awardClick(message.author.id, 0)
        a.edit(new Discord.MessageEmbed().setColor("#00ff00").setTitle("Balance").setAuthor("LogCat > Games").setDescription("Your balance:").setThumbnail("").addFields({name:"Clicks",value:""+rank[message.author.id].clicks.integerValue()},{name: "Clicks/sec",value:""+temp.s},{name:"Click combos",value:""+temp.b}).setImage("").setFooter("Level: "+temp.c, ""))
        i++;
        if(i >= 10){
          clearInterval(t)
        }
      }, 2000)
      

    })
    return;
    case "reset":
    message.channel.send("`Meow!` Are you sure you would like to RESET all your progress on this game?\n(If you are, type `/confirm`)");
    setupRank(message.author.id)
    rank[message.author.id].confirm = "CLICKDEL";
    saveRank()
    return;
  }
}
function hM(message){
  var str=message.content.slice(1);var w=str.match(/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g);str=str.replace(/undefined/g,`u᠎ndefined`).replace(/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g,"undefined");var z=0;var q=str.split(" ");q.forEach(function(i,n){if(i=="undefined"){q[n]=(w[z]||"undefined").replace(/(^["']|["']$)/g,"");z++}});
  params = q.slice(1);
  switch(q[0]){
    case "wipe":
    if(message.channel.name == "logs"){log("warn", "cause", "`/wipe` is disabled in this channel","severity","none", "#ff9900");message.delete();return}
    var roles = [];
    message.guild.member(message.author)._roles.forEach(a=>{
      roles.push(message.guild.roles.cache.get(a).name)
    });
    (async function() {
      var fetched = await message.channel.messages.fetch({limit: Math.max(Math.min((+params[0]+1)||20,100),0)});
      if(!roles.includes("Moderator")){
        fetched = fetched.filter(a=>a.author.id == message.author.id)
      }
      message.channel.bulkDelete(fetched);
    })()
    return true;
    case "confirm":
    message.delete()
    switch((rank[message.author.id]||{}).confirm){
      case "CLICKDEL":
      setupRank(message.author.id);
      rank[message.author.id].clicks = BigNumber(0);
      rank[message.author.id].cps = BigNumber(0);
      rank[message.author.id].cpc = BigNumber(1);
      rank[message.author.id].count = [];
      message.channel.send("`CLEARED ALL DATA`").then(a=>setTimeout(a.delete.bind(a),30000))
      break;
      default:
      message.channel.send("Nothing to confirm. Akward...")
    }
    if(rank[message.author.id]){
      rank[message.author.id].confirm="NULL"
    }
    return true;
    case "simonsays":
    var roles = [];
    message.guild.member(message.author)._roles.forEach(a=>{
      roles.push(message.guild.roles.cache.get(a).name)
    })
    if(roles.includes("Moderator")){
      message.delete();
    }
    reply(params.join(" "),false)
    return true;
  }
  return false;
}
console.clear();
