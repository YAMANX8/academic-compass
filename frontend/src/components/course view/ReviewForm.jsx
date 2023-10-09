import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
const ReviewForm = ({ rating, setRating, review, setReview, handleSubmit }) => {
  const [hover, setHover] = useState(0);
  return (
    <form className="flex flex-col gap-8 max-h-[70vh]" onSubmit={handleSubmit}>
      <div>
        <h3 className="mb-4">How would you evaluate this course?</h3>
        <div className="flex gap-2 justify-center items-center mb-4">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#6A1EAD66"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <p className="font-normal">
          You rate <span className="text-accent font-bold">{rating}</span> of 5!
        </p>
      </div>
      <article className="flex flex-col gap-4">
        <h3>What made you choose this rating?</h3>
        <label>
          <textarea
            name="review"
            cols="35"
            rows="2"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="p-4 font-normal rounded-[8px] bg-gray-50 outline-none"
          />
        </label>
      </article>
      <button className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
