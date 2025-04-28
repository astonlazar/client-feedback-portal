const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/")
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024}
})

module.exports = {
  upload
}