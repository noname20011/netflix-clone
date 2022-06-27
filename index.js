import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'

dotenv.config()
const PORT = process.env.PORT || 5000  
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get('/', (req, res) => {res.send('App is running!')} )
app.use('/api/user', userRoute)

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log("Server is running port", PORT )))
.catch(err => console.log(err))
