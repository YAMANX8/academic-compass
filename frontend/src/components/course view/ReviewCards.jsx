import { useRef, useEffect, useState } from "react";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
} from "react-icons/bs";
import { Modal } from "../index";

const ReviewCards = ({ reviews }) => {
  //this block of code is for knowing if the comment is overflowing or not
  const containerRefs = useRef([]);
  const [overflowStatus, setOverflowStatus] = useState([]);
  useEffect(() => {
    const newOverflowStatus = [];
    containerRefs.current.forEach((container, index) => {
      if (container) {
        // Check if the paragraph overflows verticaly
        newOverflowStatus[index] =
          container.scrollHeight > container.clientHeight;
      } else {
        newOverflowStatus[index] = false;
      }
    });
    setOverflowStatus(newOverflowStatus);
  }, []);
  //this code is for knowing if the model is opened or not
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  return (
    <div className="grid grid-cols-2 gap-4">
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className="p-[16px] shadow-[0_4px_4px] shadow-black/20 tracking-tight"
        >
          <div className="flex gap-4">
            <div className="max-w-[50px]">
              <img
                src={review.img}
                alt="Profile"
                className="aspect-square object-cover rounded-full"
              />
            </div>
            <div>
              <span>
                {review.fname} {review.lname}
              </span>
              <div className="flex gap-[5px] items-center text-[12px]">
                {[...Array(Math.floor(review.stars))].map((_, starIndex) => (
                  <Full key={starIndex} className="text-yellow-500" />
                ))}
                {review.stars % 1 !== 0 && <Half className="text-yellow-500" />}
                {[...Array(5 - Math.ceil(review.stars))].map((_, starIndex) => (
                  <Star key={starIndex} className="text-yellow-500" />
                ))}
                <span className="ml-2 text-accent/70 dark:text-accent-dark/70">
                  {review.stars}
                </span>
                <span className="ml-2 text-accent/70 dark:text-accent-dark/70">
                  {review.data}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p
              className={`comment-overflow relative ${
                overflowStatus[index] &&
                "before:absolute before:bg-gradient-to-b before:from-transparent before:to-light/90 dark:before:to-dark/90 before:pointer-events-none before:h-full before:w-full"
              }`}
              ref={(el) => (containerRefs.current[index] = el)}
              style={{}}
            >
              {review.comment}
            </p>
            {overflowStatus[index] && (
              <button
                className="flex justify-center items-center mt-[16px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
                onClick={() => {
                  setIsOpen(true);
                  setModalContent(review.comment);
                }}
              >
                Show more
              </button>
            )}
          </div>
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        content={modalContent}
        title={"Full Review"}
        close={() => setIsOpen(false)}
      />
    </div>
  );
};

export default ReviewCards;
