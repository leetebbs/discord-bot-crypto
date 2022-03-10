const Web3 = require('web3');
const badgeAbi = require('./abibadge.json');
const fetch = require('node-fetch');;
require('dotenv').config();
//const web3 = new Web3('https://rpc-testnet.kcc.network')
const web3 = new Web3('wss://rpc-ws-testnet.kcc.network') //websocket
const address = process.env.CONTRACT_ADDRESS;// testbadge contract
const contract = new web3.eth.Contract(badgeAbi, address);
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
require('dotenv').config();
listen();
botSetup();

//Listen on websocket to contract badgeAttached event
async function listen(){
    contract.events.badgeAttached({  //Name of the Event to listen to emitted by the contract
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: ''}, // Using an array means OR: e.g. 20 or 23
        fromBlock: 'latest'
        
    }, function(error, event){ 

            fromUser = event.returnValues._from;
            useId = event.returnValues.userId;
            test= event.returnValues
            const whurl = process.env.WHURL
            const msg = {
                "content": "Badge_Holder_Added "
            }

            fetch(whurl + "?wait=true", 
            {"method":"POST", 
            "headers": {"content-type": "application/json"},
            "body": JSON.stringify(msg)})
            .then(a=>a.json())//.then(console.log)
           
    })
        .on('error', console.error);
        setTimeout(listen,30000);
        console.log('pinged by timer ⏰');

}

//********set up bot***********

client.login(process.env.TOKEN)

async function botSetup(){
    
    client.on('ready', () => {
        console.log('The bot is ready 🤖');

    })
    
    //Adds Role and pemissions to channels when contract event emitted
    client.on('messageCreate', message =>{
        if(message.content === 'Badge_Holder_Added') {
            if(!message.author.bot) return;
            const guild = client.guilds.cache.get(process.env.SERVER_ID);
            guild.members.fetch().then(members =>
            {
                members.forEach(member =>
                {
                    if (useId === member.user.username){
                        let newID = member.user.id
                        console.log(member.user.username)
                        console.log(newID);
                        let id = newID 
                    let roles = process.env.ROLE_ID //NFT role id
                    guild.members.fetch(id).then(member=>member.roles.add(roles))
                        return
                    }
                });
            });
           
        }
    });

    
}

