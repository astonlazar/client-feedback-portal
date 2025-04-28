const express = require('express')
const { getFeedbackEntries, addComment } = require('../controllers/feedbackController')
const authenticateToken = require('../middlewares/auth')


const adminRoute = express.Router()

adminRoute.get('/', (req, res) => {
  res.send('admin api')
})

adminRoute.get('/api/getfeedbackentries',authenticateToken, getFeedbackEntries)
adminRoute.patch('/api/addcomment', addComment)


module.exports = adminRoute