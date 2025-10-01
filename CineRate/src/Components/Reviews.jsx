import React, { useState, useEffect } from "react";

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem(`reviews-${movieId}`);
    if (saved) {
      setReviews(JSON.parse(saved));
    }
  }, [movieId]);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(reviews));
  }, [reviews, movieId]);

  const addReview = () => {
    if (!input || rating === 0) return;
    const newReview = { text: input, rating, date: new Date().toLocaleString() };
    setReviews([...reviews, newReview]);
    setInput("");
    setRating(0);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
      <div className="flex gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Write your review..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 rounded text-black"
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="px-2 py-2 rounded text-black"
        >
          <option value={0}>⭐ Rate</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
        <button
          onClick={addReview}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Post
        </button>
      </div>

      <div className="space-y-3">
        {reviews.length === 0 && <p>No reviews yet. Be the first!</p>}
        {reviews.map((rev, idx) => (
          <div key={idx} className="bg-gray-800 p-3 rounded-lg">
            <p>{rev.text}</p>
            <p className="text-yellow-400">⭐ {rev.rating}</p>
            <p className="text-gray-500 text-sm">{rev.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
