const Feedback = require('../model/feedbackModel')
const User = require('../model/userModel')

const addFeedback = async (req, res) => {
  try {
    const {feedback, rating} = req.body
    const filename = req.file ? req.file.filename : ''
    const username = req.session.user.username

    const userData = await User.findOne({username})


    const feedbackData = {
      userId: userData._id,
      feedback,
      rating,
      image: filename
    }

    let feedBack = new Feedback(feedbackData)
    await feedBack.save()

    res.status(200).json({message: 'Success'})
  } catch (error) {
    console.error(`Error in addFeedback - ${error}`)
  }
}

const getFeedbackEntries = async (req, res) => {
  try {
    const feedbackData = await Feedback.find().populate('userId')
    if(feedbackData) {
      res.status(200).json({message: 'Success', feedbackEntries: feedbackData})
      return
    }
    res.status(200).json({message: 'No entries'})
  } catch (error) {
    console.error(`Error in getFeedbackEntries - ${error}`)
  }
}

const addComment = async (req, res) => {
  try {
    const {commentText, feedbackId} = req.body
    const feedbackData = await Feedback.findById(feedbackId)
    if(feedbackData) {
      feedbackData.adminComment = commentText
      await feedbackData.save()
    }
    res.status(200).json({message: 'Almost Success'})
  } catch (error) {
    console.error(`Error in addComment - ${error}`)
  }
}

module.exports = {
  addFeedback,
  getFeedbackEntries,
  addComment
}