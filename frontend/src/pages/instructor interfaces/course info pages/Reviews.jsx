import React, { useRef, useEffect, useState } from "react";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
} from "react-icons/bs";
import Modal from "../../../components/interface/Modal";
import { Helmet } from "react-helmet-async";

const Reviews = ({ data }) => {
  const containerRefs = useRef([]);
  const [overflowStatus, setOverflowStatus] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(4); // حالة جديدة

  useEffect(() => {
    const newOverflowStatus = [];
    containerRefs.current.forEach((container, index) => {
      if (container) {
        newOverflowStatus[index] =
          container.scrollHeight > container.clientHeight;
      } else {
        newOverflowStatus[index] = false;
      }
    });
    setOverflowStatus(newOverflowStatus);
  }, [data]);

  return (
    <>
      {" "}
      <Helmet>
        <title>Course Info: Reviews</title>
      </Helmet>
      <div>
        <div className="grid grid-cols-2 gap-4">
          {data.slice(0, displayedReviewsCount).map((review, index) => (
            <div
              key={review.id}
              className="p-[16px] shadow-[0_4px_4px] shadow-black/20 tracking-tight"
            >
              <div className="flex gap-4">
                <div className="max-w-[50px]">
                  <img
                    src={review.img}
                    alt={`${review.fname} ${review.lname}`}
                    className="aspect-square object-cover rounded-full"
                  />
                </div>
                <div>
                  <span>
                    {review.fname} {review.lname}
                  </span>
                  <div className="flex gap-[5px] items-center text-[12px]">
                    {[...Array(Math.floor(review.stars))].map(
                      (_, starIndex) => (
                        <Full key={starIndex} className="text-yellow-500" />
                      )
                    )}
                    {review.stars % 1 !== 0 && (
                      <Half className="text-yellow-500" />
                    )}
                    {[...Array(5 - Math.ceil(review.stars))].map(
                      (_, starIndex) => (
                        <Star key={starIndex} className="text-yellow-500" />
                      )
                    )}
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
                  className="comment-overflow relative overflow-hidden max-h-[100px]"
                  ref={(el) => (containerRefs.current[index] = el)}
                >
                  {review.comment}
                </p>
                {(overflowStatus[index] || review.comment.length > 100) && (
                  <button
                    className="flex justify-center items-center mt-[16px] px-[20px] py-[10px] font-semibold rounded-[5px] text-primary border border-accent bg-gradient-to-r"
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
        </div>

        {/* إذا كان هناك المزيد من التعليقات للعرض، فسيظهر الزر */}
        <div
          onClick={() => setDisplayedReviewsCount(displayedReviewsCount + 4)}
          className="flex justify-center items-center mt-[16px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
        >
          <button>Load more reviews</button>
        </div>

        <Modal
          isOpen={isOpen}
          content={modalContent}
          title={"Full Review"}
          close={() => setIsOpen(false)}
        />
      </div>
    </>
  );
};

export default Reviews;
