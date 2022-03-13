const Web3 = require('web3');
const badgeAbi = require('./abibadge.json');
require('dotenv').config();
const web3 = new Web3('wss://rpc-ws-testnet.kcc.network');
const address = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(badgeAbi, address);
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log('The bot is ready 🤖');
listen();
async function listen(){
    contract.events.badgeAttached({  
        filter: {myIndexedParam: [20,23], myOtherIndexedParam: ''}, 
        fromBlock: 'latest'
    }, function(error, event){ 
        
        fromUser = event.returnValues._from;
        useId = event.returnValues.userId;
        test= event.returnValues;

        const guild = client.guilds.cache.get(process.env.SERVER_ID);
        guild.members.fetch().then(members =>
        {
            members.forEach(member =>
            {
                let newID = member.user.id
                let userName = member.user.username
                let id = newID 
                if(useId !== userName){
                    return
                }else{
                    let roles = process.env.ROLE_ID
                    guild.members.fetch(id).then(member=>member.roles.add(roles))
                }
            });
        });       
    })
        .on('error', console.error);
        setTimeout(listen,30000);
        console.log('pinged by timer ⏰');
}
})