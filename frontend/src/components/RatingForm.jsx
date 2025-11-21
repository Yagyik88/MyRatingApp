import { useState } from "react";
import axios from "axios";

export default function RatingForm({ storeId, userRating, onDone }) {
  const [rating, setRating] = useState(userRating || "");
  const API = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      `${API}/ratings`,
      { storeId, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (onDone) onDone();
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <select
        className="select"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">Rate...</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      <button className="btn small">Submit</button>
    </form>
  );
}
