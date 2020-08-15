//all api end points,simple get request code

const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User=require('../models/user')
//CONNECT WITH DATABASE (all database request metioned here)
const mongoose=require('mongoose')
//connection string
//const db="mongodb+srv://userevents:<password>@clusterevent.os0xu.mongodb.net/test"
const db="mongodb+srv://userevents:pwdevents@clusterevent.os0xu.mongodb.net/eventsdbnew"
//?authSource=admin&replicaSet=atlas-397mhh-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

//database connection
//mongoose.connect(db,{ useNewUrlParser: true },(err) =>{
    mongoose.connect(db,(err) =>{
    if(err){
        console.log('Errors :' +err)
    }else{
        console.log("Connected TO mongodb")
    }
})



//interceptor to check the token with backend
function verifyToken(req,res,next){
    //check the authorization key is present or not
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==='null')
    {
        return res.status(401).send('unauthorized request')
    }                      //if present verify the token with jwt(it returns the decoded token only if it is valid)

    let payload=jwt.verify(token, 'secretkey')
    if(!payload){
        return res.status(401).send('unauthorized request')
    }
    req.userId =payload.subject
    next()
}    //now it is ready to pass or use as middleware to check the token, add it to the argument of special eventsapi


//get request

router.get('/',(req, res) => {
    res.send('From API route')
})

//post request(registeration api) 
router.post('/register',(req,res)=>{
    let userData=req.body  //converted into the model that mongoose understand
    let user=new User(userData)
    user.save((error,registeredUser)=>{       //save the user into the db
        if(error){
            console.log(error)
        }else{
            let payload={subject:registeredUser._id}
            let token=jwt.sign(payload,'secretkey')
            res.status(200).send({token})
        }
    })
})

//post request for login api
router.post('/login',(req,res)=>{
let userData=req.body
User.findOne({email:userData.email},(error,user)=>{
    if(error){
        console.log(error)
    }else{
        if(!user){
            res.status(401).send('invalid email')

        }else if (user.password!==userData.password)
        {
            res.status(401).send('invalid PASSWORD')
        }

        let payload={subject:user._id}
        let token=jwt.sign(payload,'secretkey')
        res.status(200).send({token})
    }
})
})

//for regular events
router.get('/events',(req,res)=>{
    let events=[
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-08-23"

        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-08-22"

        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2020-08-22"

        }
    ]

    res.json(events)
})

//for special events
//verifyToken-----interceptor
router.get('/special', verifyToken,(req,res)=>{
    let events=[
        {
            "_id":"1",
            "name":"Auto SpecialExpo",
            "description":"lorem ipsum",
            "date":"2020-08-23"

        },
        {
            "_id":"2",
            "name":"Auto SpecialExpo",
            "description":"lorem ipsum",
            "date":"2020-08-22"

        },
        {
            "_id":"3",
            "name":"Auto SpecialExpo",
            "description":"lorem ipsum",
            "date":"2020-08-22"

        }
    ]

    res.json(events)
})


//export router -telling the server to use this routes
module.exports = router