const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    adminComment: {
      type: String,
      required: false,
      default: null,
    }
  }
)

module.exports = mongoose.model('feedbacks', feedbackSchema)