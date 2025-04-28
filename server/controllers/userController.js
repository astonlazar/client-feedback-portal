const User = require('../model/userModel')
const bcyrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

// const checkToken = async (req, res) => {
//   try {

//   } catch (err) {
//     console.log(`Error in checkToken - ${err}`)
//   }
// }

const userSignup = async (req, res) => {
  try {
    const {fullname, username, password} = req.body
    let checkUser = await User.findOne({username: username})
    if(checkUser) {
      res.status(500).json({message: 'User already exists'})
      return
    }
    let userData = {
      fullname,
      username,
      password: await bcyrpt.hash(password, 10)
    }
    console.log(userData)

    let newUser = new User(userData)
    newUser.save()
    .then(() => {
      req.user = userData
      const token = jwt.sign({username}, process.env.JWT_SECRET_KEY, {expiresIn: '1h', algorithm: 'HS256'})
      res.header('Authorization', `Bearer ${token}`)
      res.status(200).json({message: 'User created successfully', token, role: 'user'})
    })
    .catch(err => {
      console.log(err)
    })

  } catch (error) {
    console.error(`Error in userSignup - ${error}`)
  }
}

const userLogin = async (req, res) => {
  try {
    const {username, password} = req.body
    let userCheck = await User.findOne({username})
    if(!userCheck) {
      res.status(500).json({message: 'User does not exist'})
      return
    }
    let passwordCheck = await bcyrpt.compare(password, userCheck.password)
    if(!passwordCheck) {
      res.status(501).json({message: 'Incorrect password entered'})
      return
    }
    req.session.user = {id: userCheck._id, username: userCheck.username}
    const token = jwt.sign({username}, process.env.JWT_SECRET_KEY, {expiresIn: '1h', algorithm: 'HS256'})
    res.header('Authorization', `Bearer ${token}`)
    res.status(200).json({message: 'Login Success', token, role: userCheck.role})

  } catch (error) {
    console.error(`Error in userLogin - ${error}`)
  }
}

module.exports = {
  userSignup,
  userLogin
}