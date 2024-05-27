require('dotenv').config();
const  express = require('express')
const  bodyParser = require('body-parser')

var cors = require('cors')
const app = express()



 
app.use(cors())
 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const apiRoute=require('./Route/bookingRoute');

app.use('/api',apiRoute)

app.listen(process.env.PORT||3000,()=>{
    console.log("Server Started");
})