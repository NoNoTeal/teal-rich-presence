module.exports = {
    discord:{
        presenceID:"705703533907017728",
    },

    // only change assets in richPresence
    // if you want something to be left out,
    // then leave the string, array, or party 
    // size blank. Strings have no length, 
    // Number is 0 for both party size & party maximum.
    // Array should be empty.

    richPresence:{
        details: "this is",
        state: "lynx face reveal",

        startTimestamp: Date.now(),
        endTimestamp: Date.now()+(1000),

        largeImageKey: "lynx1",
        largeImageText: "",

        smallImageKey: "lynxpedo",
        smallImageText: "",

        partyId: "",
        partySize: 0,
        partyMax: 0,

        matchSecret: "",
        spectateSecret: "",
        joinSecret: "",

        buttons: [{label:"alco",url:"https://discord.com"},{label:"see me please",url:"https://discord.com"}],
    },

    statusStructure:`
        CLIENT NAME
        details
        state (Party size of Party max)
        startTimestamp - endTimestamp left
        ASK TO JOIN ... or 2 buttons
    `,

    imageStructure: `          
        *--------------*
        |              |
        |              |
        |          /---+-Large Image Key | Hover for Large Image Text
        |          \---+-/
        |         +----+
        |         |  <-+--Small Image Key | Hover for Small Image Text
        *---------+----+
    `,

    validateInfo: function (info) {
        if(info) {
            var err = 0;
            if(typeof(info.startTimestamp)!=='number'??info.startTimestamp!==undefined) {
                console.log('* startTimestamp needs to be a number or undefined.');
                err++;
            }
            if(typeof(info.endTimestamp)!=='number'??info.endTimestamp!==undefined) {
                console.log('* endTimestamp needs to be a number or undefined.');
                err++;
            }
            if(info.largeImageText.length) {
                if(!info.largeImageKey.length) {
                    console.log('* WARNING: largeImageText provided but largeImageKey not provided!');
                }
            }
            if(info.smallImageText.length) {
                if(!info.smallImageKey.length) {
                    console.log('* WARNING: smallImageText provided but smallImageKey not provided!');
                }
            }
            var partyID = info.partyId.toLowerCase();
            var matchSecret = info.matchSecret.toLowerCase();
            var spectateSecret = info.spectateSecret.toLowerCase();
            var joinSecret = info.joinSecret.toLowerCase();
            if([matchSecret,spectateSecret,joinSecret].every(i=>i.length)) {
                if([matchSecret,spectateSecret,joinSecret].includes(partyID)) {
                    console.log('* Secrets cannot be same as party ID!');
                    err++;
                }
                if([matchSecret,spectateSecret,joinSecret].some(l=>l.length)&&info.buttons.length) {
                    console.log('* Secrets cannot exist with buttons!');
                    err++;
                }
            }
            if(info.partySize!==0&&info.partyMax!==0) {
                if(info.partySize < 1) {
                    console.log('* Party size has to be >=1!');
                    err++;
                }
                if(info.partyMax <= 1) {
                    console.log('* Party maximum has to be >1!');
                    err++;
                }
            }
            if(Array.isArray(info.buttons)) {
                for(var buttonObj of info.buttons) {
                    var index = info.buttons.indexOf(buttonObj)+1;
                    if(Object.keys(buttonObj).length !== 2) {
                        console.log('* Button object #' + index + ' does not have a length of 2 keys: strict!');
                        err++;
                    }
                    if(!Object.keys(buttonObj).every(k=>['url','label'].includes(k.toLowerCase()))) {
                        console.log('* Button object #' + index + ' does not have 2 keys of label & url: strict!');
                        err++;
                    }
                    if(buttonObj['label']) {
                        if(!buttonObj['label'].length) {
                            console.log('* Button object #' + index + '\'s label needs to have a length.')
                            err++;
                        }
                    }
                    if(buttonObj['url']) {
                        if(!buttonObj['url'].length) {
                            console.log('* Button object #' + index + '\'s url needs to have a length.')
                            err++;
                        }
                    }
                }
            }
            if(err) {
                console.log("Fix the following errors above.");
                console.log("Errors occurred: " + err);
                process.exit(0);
            }
        } else {
            console.log('* No info provided!');
            process.exit(0);
        }
    }
}