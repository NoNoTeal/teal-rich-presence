const RPC = require('discord-rpc');
const config = require('./config');
const client = new RPC.Client({transport:"ipc"});
config.validateInfo(config.richPresence);
const info = config.richPresence;
const obj = {};
if(Array.isArray(info.buttons)) {
    if(info.buttons.length) {
        obj['buttons']=info.buttons;
    }
}
if(typeof(info.startTimestamp)=='number') {
    if(info.startTimestamp!==0) {
        obj['startTimestamp']=info.startTimestamp;
    }
}
if(typeof(info.endTimestamp)=='number') {
    if(info.endTimestamp!==0) {
        obj['endTimestamp']=info.endTimestamp;
    }
}
if(info.largeImageText.length) {
    obj['largeImageText']=info.largeImageText;
}
if(info.largeImageKey.length) {
    obj['largeImageKey']=info.largeImageKey;
}
if(info.smallImageText.length) {
    obj['smallImageText']=info.smallImageText;
}
if(info.smallImageKey.length) {
    obj['smallImageKey']=info.smallImageKey;
}
if(info.state.length) {
    obj['state']=info.state;
}
if(info.details.length) {
    obj['details']=info.details;
}
if(info.partyId.length) {
    obj['partyId']=info.partyId;
}
if(typeof(info.partyMax)=="number") {
    obj['partyMax']=info.partyMax;
}
if(typeof(info.partySize)=="number") {
    obj['partySize']=info.partySize;
}
if(info.joinSecret.length) {
    obj['joinSecret']=info.joinSecret;
}
if(info.spectateSecret.length) {
    obj['spectateSecret']=info.spectateSecret;
}
if(info.matchSecret.length) {
    obj['matchSecret']=info.matchSecret;
}
obj['instance']=true;
console.log("Connecting to Discord...")
function login() {
    client.login({ clientId: config.discord.presenceID }).then(() => {client.setActivity(obj);console.log('Presence updated.')})
      .catch((err) => {
        if(err.toString() === "Error: Could not connect") {
          console.err("Failed to connect to Discord.");
        } else {
          console.err("Error: "+err);
        }
      });
}
login();