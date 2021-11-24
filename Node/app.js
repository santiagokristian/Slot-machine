const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const sessionRoutes = require('./routes/sessions')
const slotRoutes = require('./routes/slotRolls')

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:"secret"
}))
app.use(cors({credentials: true, origin: 'http://localhost:4200'}))
//Routes 
app.use('/api/session',sessionRoutes)
app.use('/api/slotRolls',slotRoutes)


//listening to server
//Port
const port = process.env.port||3000
app.listen(port,()=>console.log(`Listening to port ${port}`));
