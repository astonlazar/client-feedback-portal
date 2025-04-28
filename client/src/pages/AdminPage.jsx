import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const AdminPanel = () => {
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [filterRating, setFilterRating] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');
  const [comments, setComments] = useState({}); // { feedbackId: 'comment text' }
  const [addComment, setAddComment] = useState('')
  const API_URL = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')

  // Simulate fetching feedback data from an API
  useEffect(() => {
    // Replace this with your actual API call
    axios.get(`${API_URL}/admin/api/getfeedbackentries`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((result) => {
      console.log(result.data.feedbackEntries)
      setFeedbackEntries(result.data.feedbackEntries);
    })
    .catch(err => {
      console.log(err)
    })
  }, [addComment]);

  const handleFilterChange = (event) => {
    setFilterRating(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleCommentChange = (event, feedbackId) => {
    setAddComment('')
    setComments(prevComments => ({
      ...prevComments,
      [feedbackId]: event.target.value,
    }));
  };

  const handleAddComment = (feedbackId) => {
    const commentText = comments[feedbackId];
    console.log(commentText)
    if (commentText) {
      console.log(`Adding comment "${commentText}" to feedback ID ${feedbackId}`);
      axios.patch(`${API_URL}/admin/api/addcomment`, {commentText: commentText, feedbackId: feedbackId} , {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(result => {
        console.log('success')
        setAddComment('done')
      })
      .catch(err => {
        console.log(err)
      })
      // Optionally, update the feedbackEntries state to reflect the comment
      setComments({ ...comments, [feedbackId]: '' }); // Clear the comment input
    }
  };

  const filteredFeedback = feedbackEntries.filter((entry) =>
    filterRating === '' || entry.rating === parseInt(filterRating)
  );

  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    if (sortBy === 'date_asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'date_desc') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Panel - Feedback Management</h2>

      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label htmlFor="filterRating" className="block text-gray-700 text-sm font-bold mb-2">
            Filter by Rating:
          </label>
          <select
            id="filterRating"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterRating}
            onChange={handleFilterChange}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortBy" className="block text-gray-700 text-sm font-bold mb-2">
            Sort By:
          </label>
          <select
            id="sortBy"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date_desc">Date (Newest First)</option>
            <option value="date_asc">Date (Oldest First)</option>
          </select>
        </div>
      </div>

      {sortedFeedback.length === 0 ? (
        <p>No feedback entries found based on the current filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedFeedback.map((feedback, index) => (
            <div key={feedback._id} className="bg-white shadow-md rounded-md p-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold">{feedback.userId.username}</span>
                <div className="ml-2 flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-yellow-500 ${
                        index < feedback?.rating ? 'fill-current' : 'fill-gray-400'
                      } mr-1`}
                      size={16}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{feedback.feedback}</p>
              {feedback.image && (
                <div className="mb-2">
                  <img src={`http://localhost:3333/images/${feedback.image}`} alt="Feedback Image" className="w-auto max-h-40 rounded-md" />
                </div>
              )}
              <p className="text-gray-500 text-sm mb-2">Date: {feedback.date.toString().split('T')[0]}</p>

              <div>
                {feedback.adminComment ? (
                  // If there's an existing admin comment, display it
                  <div className="mt-2 p-2 bg-gray-100 rounded text-sm text-gray-600">
                    <p className="font-semibold">Admin Response:</p>
                    <p>{feedback.adminComment}</p>
                  </div>
                ) : (
                  // If there's no existing admin comment, display the input elements
                  <>
                    <label htmlFor={`comment-${feedback._id}`} className="block text-gray-700 text-sm font-bold mb-2">
                      Respond:
                    </label>
                    <textarea
                      id={`comment-${feedback._id}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                      rows="2"
                      placeholder="Your comment..."
                      value={comments[feedback._id] || ''}
                      onChange={(e) => handleCommentChange(e, feedback._id)}
                    />
                    <button
                      className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                      onClick={() => handleAddComment(feedback._id)}
                    >
                      Add Comment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;