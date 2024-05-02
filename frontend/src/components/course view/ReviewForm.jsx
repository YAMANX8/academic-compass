import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "../../apis/axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "src/auth/hooks";
import { Button } from "../index";
const ReviewForm = ({ setIsOpen }) => {
  const [data, setData] = useState({
    rating: 0,
    review: "",
  });
  const { user } = useAuthContext();
  const { id } = useParams();
  const [hover, setHover] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/review/edit_review/${id}`,
        { stars_number: data.rating, review: data.review },
        {
          headers: { token: user?.accessToken },
        },
      );
      toast.success(`your rating: ${data.rating}, your review: ${data.review}`);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/review/delete_review/${id}`, {
        headers: { token: user?.accessToken },
      });
      toast.success(`Your review is deleted successfully!`);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getReview = async () => {
      try {
        const res = await axios.get(`/review/show_review/${id}`, {
          headers: { token: user?.accessToken },
        });
        if (res.data.rating != null) setHasReviewed(true);
        const starsNumber = (await res?.data?.rating) || 0;
        const reviewBody = (await res?.data?.review) || "";
        setData((prev) => {
          return { ...prev, rating: starsNumber, review: reviewBody };
        });
      } catch (error) {
        console.error(error);
      }
    };
    getReview();
  }, []);
  return (
    <form className="flex max-h-[70vh] flex-col gap-8" onSubmit={handleSubmit}>
      <div>
        <h3 className="mb-4">How would you evaluate this course?</h3>
        <div className="mb-4 flex items-center justify-center gap-2">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() =>
                    setData((prev) => ({ ...prev, rating: ratingValue }))
                  }
                />
                <FaStar
                  color={
                    ratingValue <= (hover || data.rating)
                      ? "#ffc107"
                      : "#6A1EAD66"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <p className="font-normal">
          You rate <span className="font-bold text-accent">{data.rating}</span>{" "}
          of 5!
        </p>
      </div>
      <article className="flex flex-col gap-4">
        <h3>What made you choose this rating?</h3>
        <label>
          <textarea
            name="review"
            cols="35"
            rows="2"
            value={data.review}
            onChange={(e) =>
              setData((prev) => ({ ...prev, review: e.target.value }))
            }
            className="rounded-[8px] bg-gray-50 p-4 font-normal outline-none"
          />
        </label>
      </article>
      <div className="flex flex-1 items-center justify-center gap-4">
        {!hasReviewed ? (
          <Button>Submit</Button>
        ) : (
          <>
            <Button color="error" type="button" onClick={handleDelete}>
              Delete
            </Button>
            <Button color="info">Update</Button>
          </>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
