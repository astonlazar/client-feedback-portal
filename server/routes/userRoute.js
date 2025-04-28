const express = require('express')
const { userSignup, userLogin } = require('../controllers/userController')
const { addFeedback } = require('../controllers/feedbackController')
const { upload } = require('../helpers/multer')
const authenticateToken = require('../middlewares/auth')


const userRoute = express.Router()

userRoute.get('/', (req, res) => {
  res.send('user api')
})
// user.post('/chech-token', )
userRoute.post('/signup', userSignup)
userRoute.post('/login', userLogin)
userRoute.post('/add-feedback', authenticateToken, upload.single('file'), addFeedback)


module.exports = userRoute