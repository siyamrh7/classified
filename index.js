require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose = require('mongoose')
const router=require('./routes/Routes')

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@cluster0.vfwpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>console.log("Database is Connected")).catch(err=>console.log(err))

const app=express()

app.use(cors())
app.use(express.json())
app.use('/api/',router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})