const express = require('express')
const connection = require('./db/conn')
const cors = require('cors')
const path = require('path')
const session = require('express-session')
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

//parsing
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use(express.static('public'))
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(cors())

app.use(session({
  secret: 'your-secret-key-yoyo', // Replace with a strong, random secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    maxAge: 24 * 60 * 60 * 1000 // Session duration (e.g., 24 hours in milliseconds)
  },
}));

//api routing
app.use('/api', userRoute)
app.use('/admin', adminRoute)

//mongodb connection
connection()

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})