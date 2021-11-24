const {sessionData,rollValues} = require('../datas/serverDatas')


const retrieveSessionId = (req, res) => {
    console.log(randomizeRoll());
    res.send(sessionData)
}

const rollMachine = (req, res) => {
    const userSessionId = req.session.id;
    let sessionIndex = sessionData.findIndex((session) => session.sessionId == userSessionId);


    if (sessionIndex < 0) {
        res.status(400).send(`Session Details not found. Please refresh page to create a new Session`);
        return;
    }
    if (sessionData[sessionIndex].credits == 0) {
        res.status(400).send(`You don't have enough credits to roll the machine. Please checkout to end playtime and start a new Session`);
        return;
    }
    //remove 1 coin
    let sessionCoins = --sessionData[sessionIndex].credits;
    
    //rollslots
    let rollResults = rollAllSlots();
    if (checkWinningRoll(rollResults)) {
        if (randomizeReRollChance(sessionCoins)) {
            rollResults = rollAllSlots();
        }
        addWinnings(rollResults,sessionIndex)
    }
    let results = { rollDetails:rollResults,credits:sessionData[sessionIndex].credits}
    res.send(results);
}



function rollAllSlots() {
    let first = randomizeRoll();
    let second = randomizeRoll();
    let third = randomizeRoll();

    return { firstSlot: first, secondSlot: second, thirdSlot: third }
}


function randomizeRoll() {
    let random = Math.floor(Math.random() * 4)
    return rollValues[random]
}

function randomizeReRollChance(credits) {
    //random number from 1 to 100
    let random = Math.floor(Math.random() * 100) + 1
    let reroll = false;
    if (credits => 40 && credits <= 60) {
        //30 percent chance to reroll if credits are between 40 and 60
        if (random <= 30) {
            reroll = true
        }
    } else if (credits > 60) {
        //60 percent chance to reroll if credits are greater then 60
        if (random <= 60) {
            reroll = true
        }
    }

    return reroll
}

function checkWinningRoll(roll) {
    let win = false;
    if (roll.firstSlot == roll.secondSlot && roll.firstSlot == roll.thirdSlot) {
        win = true;
    }
    return win
}

function addWinnings(roll,sessionIndex){
    if(!checkWinningRoll(roll)){
        return
    }

    switch(roll.firstSlot){
        case 'C':sessionData[sessionIndex].credits += 10;
                 break;
        case 'L':sessionData[sessionIndex].credits += 20;
                 break;
        case 'O':sessionData[sessionIndex].credits += 30;
                 break;
        case 'M':sessionData[sessionIndex].credits += 40;
                 break;
    }
}



module.exports = { retrieveSessionId, rollMachine }