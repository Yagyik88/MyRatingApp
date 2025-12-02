import { useState } from "react";
import axios from "axios";

export default function RatingForm({ storeId, userRating, onDone }) {
  const [rating, setRating] = useState(userRating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const API = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!rating || rating < 1 || rating > 5) {
    setMessage("Please select a rating");
    return;
  }

  const token = localStorage.getItem("token");
  setIsSubmitting(true);
  setMessage("");

  try {
    await axios.post(
      `${API}/ratings`,
      { storeId, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessage("Rating submitted successfully!");

setTimeout(() => {
  setMessage("");
  if (onDone) setTimeout(onDone, 300);  // FIX
}, 1000);


  } catch (err) {
    setMessage("Failed to submit rating");
  } finally {
    // 🔥 FIX: This stops the loading spinner
    setIsSubmitting(false);
  }
};


  const handleStarClick = (value) => {
    setRating(value);
    setMessage("");
  };

  return (
    <form className="rating-form-interactive" onSubmit={handleSubmit}>
      <div className="rating-form-content">
        <div className="star-rating-input">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-button ${
                star <= (hoveredRating || rating) ? "active" : ""
              }`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              disabled={isSubmitting}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={star <= (hoveredRating || rating) ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          ))}
        </div>

        {rating > 0 && (
          <div className="rating-value-display">
            <span className="rating-value-text">{rating}/5</span>
            <span className="rating-value-label">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          </div>
        )}
      </div>

      {message && (
        <div className={`rating-message ${message.includes("success") ? "success" : "error"}`}>
          {message.includes("success") ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          <span>{message}</span>
        </div>
      )}

      <div className="rating-form-actions">
        <button
          className="btn btn-primary btn-small"
          type="submit"
          disabled={isSubmitting || !rating}
        >
          {isSubmitting ? (
            <>
              <div className="spinner-small"></div>
              Submitting...
            </>
          ) : userRating ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Update Rating
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Submit Rating
            </>
          )}
        </button>

        {rating > 0 && (
          <button
            type="button"
            className="btn ghost btn-small"
            onClick={() => {
              setRating(0);
              setMessage("");
            }}
            disabled={isSubmitting}
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}