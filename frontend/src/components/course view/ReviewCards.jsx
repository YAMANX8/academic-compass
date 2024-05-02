import { useRef, useEffect, useState } from "react";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
} from "react-icons/bs";
import { Modal, Button } from "../index";

const ReviewCards = ({ reviews }) => {
  // هذه الجزء من الكود مُعد لمعرفة ما إذا كان التعليق يتجاوز الحد المحدد أم لا.
  const containerRefs = useRef([]);
  const [overflowStatus, setOverflowStatus] = useState([]);
  useEffect(() => {
    const newOverflowStatus = [];
    containerRefs.current.forEach((container, index) => {
      if (container) {
        // تحقق إذا كان الفقرة يتجاوز عموديًا.
        newOverflowStatus[index] =
          container.scrollHeight > container.clientHeight;
      } else {
        newOverflowStatus[index] = false;
      }
    });
    setOverflowStatus(newOverflowStatus);
  }, []);
  // هذا الكود مُعد لمعرفة ما إذا كان النموذج مفتوحًا أم لا.
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  return (
    <div className="grid grid-cols-2 gap-4">
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className="p-[16px] tracking-tight shadow-[0_4px_4px] shadow-black/20"
        >
          <div className="flex gap-4">
            <div className="max-w-[50px]">
              <img
                src={review.img}
                alt="Profile"
                className="aspect-square rounded-full object-cover"
              />
            </div>
            <div>
              <span>
                {review.fname} {review.lname}
              </span>
              <div className="flex items-center gap-[5px] text-[12px]">
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
                "before:pointer-events-none before:absolute before:h-full before:w-full before:bg-gradient-to-b before:from-transparent before:to-light/90 dark:before:to-dark/90"
              }`}
              ref={(el) => (containerRefs.current[index] = el)}
              style={{}}
            >
              {review.comment}
            </p>
            {overflowStatus[index] && (
              <Button
                size="sm"
                onClick={() => {
                  setIsOpen(true);
                  setModalContent(review.comment);
                }}
              >
                Show more
              </Button>
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
