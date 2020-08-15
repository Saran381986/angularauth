const express= require('express')
const bodyParser= require('body-parser')
const cors=require('cors')

const PORT=3000   //MENTION THE PORT NUMBER OF WHERE OUR SERVER RUNS ON
const api=require('./routes/api')  //use this api for routes
//CREATE AN INSTANCE OF EXPRESS

const app=express()
//body parser to handle json data
app.use(cors())
app.use(bodyParser.json())
app.use('/api',api)     //server knows we have to use this api for routes(it displays the messasage from api localhost:3000/api)


//get something from express server

app.get('/',function(req,res){
    res.send("Hello from server")
})

//listening the server
app.listen(PORT,function(){
    console.log("server is running on localhost" + PORT);

})