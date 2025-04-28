import React, { useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon
import axios from 'axios'

const HomePage = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [feedbackError, setFeedbackError] = useState('')
  const [ratingError, setRatingError] = useState('')
  const imageInputRef = useRef(null)
  const API_URL = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleFeedbackSubmit = (e) => {
    if(!feedback) {
      setFeedbackError('Feedback cannot be empty!')
    }
    if(!rating) {
      setRatingError('Rating should be done!')
    }
    if(feedback && rating) {

      const formData = new FormData();
      formData.append('feedback', feedback);
      formData.append('rating', rating);
      if (image) {
        formData.append('file', image); // 'file' is the field name your backend expects
      }
      
      axios.post(`${API_URL}/api/add-feedback`, formData, {
        headers: {
          'Content-Type': 'multipart/formdata',
          'Authorization': `Bearer ${token}`
        },
      })
      .then((result) => {
        console.log(result)
        setFeedback('');
        setRating(0);
        setImage(null);
        if(imageInputRef.current) {
          imageInputRef.current.value = ''
        }
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Feedback</h2>

      <div>
        <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
          Your Feedback:
        </label>
        <textarea
          id="feedback"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <p className='text-red-600 text-sm font-medium'>{feedbackError}</p>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
        <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`cursor-pointer text-yellow-500 ${
              index < rating ? 'fill-yellow-500' : 'fill-gray-400'
            } mr-1`}
            size={24}
            onClick={() => handleStarClick(index)}
          />
        ))}
          {rating > 0 && <span className="text-gray-600 ml-2">{rating}/5</span>}
        </div>
        <p className='text-red-600 text-sm font-medium'>{ratingError}</p>
      </div>

      <div>
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Upload Image (Optional):
        </label>
        <input
          type="file"
          accept='.jpg,.jpeg,.png'
          id="image"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleImageChange}
          ref={imageInputRef}
        />
        {image && (
          <div className="mt-2">
            <p className="text-gray-600 text-sm">Selected Image:</p>
            {/* You might want to display a thumbnail here */}
            <span className="text-gray-600 text-xs">{image.name}</span>
          </div>
        )}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleFeedbackSubmit}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default HomePage;