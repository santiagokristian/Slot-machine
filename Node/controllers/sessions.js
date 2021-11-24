const { sessionData,userData } = require('../datas/serverDatas')
const Joi = require('joi')
let idNum = 0;

//Generate New Session
const newSession = (req, res) => {
    const newSessionName = generateSessionId();
    let sessionDetails = { sessionName: newSessionName, credits: 10 }
    const sessionId = req.session.id;

    let existingSession = sessionData.find((data) =>  data.sessionId === sessionId );

    if (!existingSession) {
        req.session.userDetails = sessionDetails
        req.session.save();
        const fullSessionDetails = { sessionId: req.session.id.trim(), sessionName: newSessionName, credits: 10 }
        sessionData.push(fullSessionDetails);
    }else{
        idNum--;
        sessionDetails.sessionName= existingSession.sessionName;
        sessionDetails.credits= existingSession.credits;
    }
    res.send(sessionDetails)
}

const checkSession = (req, res) => {
    const sessionDetails = { sessionId: req.session.id, userDetails: req.session.userDetails }
    return res.send(sessionDetails)
}

const checkOutSessionCredits = (req, res)=>{
    const {error} = validateUser(req.body);
    const sessionId = req.session.id;
    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    let existingSession = sessionData.find((data) =>  data.sessionId === sessionId );
    
    if(!existingSession){
        res.status(400).send('Session ID not found. Please refresh the page');
        return;
    }
    const existingSessionIndex = sessionData.findIndex((data) =>  data.sessionId === sessionId );
    const userDetails = {name:req.body.name, email:req.body.email,credits:existingSession.credits};
    let existingUserIndex = userData.findIndex((data) =>  data.email === userDetails.email );
    if(existingUserIndex<0){
        userData.push(userDetails)
    }else{
        userData[existingUserIndex].credits +=userDetails.credits;
        userDetails.credits = userData[existingUserIndex].credits;
    }
    sessionData.splice(existingSessionIndex,1);
    req.session.destroy();
    res.status(200).send(userDetails);

}


function generateSessionId() {
    const sessionId = 'test' + (idNum++)
    return sessionId
}

function validateUser(user){
    const schema =Joi.object( {
        name: Joi.string().min(3).required(),
        email:Joi.string().email().required(),
    })
    return schema.validate(user);
}



module.exports = { newSession, checkSession,checkOutSessionCredits }