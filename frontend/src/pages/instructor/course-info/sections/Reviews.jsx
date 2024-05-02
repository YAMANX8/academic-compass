import React, { useRef, useEffect, useState } from "react";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
} from "react-icons/bs";
import Modal from "src/components/interface/Modal";
import { Helmet } from "react-helmet-async";
import { Button } from "../../../../components";

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
          {data?.slice(0, displayedReviewsCount).map((review, index) => (
            <div
              key={review.id}
              className="p-[16px] tracking-tight shadow-[0_4px_4px] shadow-black/20"
            >
              <div className="flex gap-4">
                <div className="max-w-[50px]">
                  <img
                    src={review.img}
                    alt={`${review.fname} ${review.lname}`}
                    className="aspect-square rounded-full object-cover"
                  />
                </div>
                <div>
                  <span>
                    {review.fname} {review.lname}
                  </span>
                  <div className="flex items-center gap-[5px] text-[12px]">
                    {[...Array(Math.floor(review.stars))].map(
                      (_, starIndex) => (
                        <Full key={starIndex} className="text-yellow-500" />
                      ),
                    )}
                    {review.stars % 1 !== 0 && (
                      <Half className="text-yellow-500" />
                    )}
                    {[...Array(5 - Math.ceil(review.stars))].map(
                      (_, starIndex) => (
                        <Star key={starIndex} className="text-yellow-500" />
                      ),
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
                  className="comment-overflow relative max-h-[100px] overflow-hidden"
                  ref={(el) => (containerRefs.current[index] = el)}
                >
                  {review.comment}
                </p>
                {(overflowStatus[index] || review.comment.length > 100) && (
                  <Button
                    className="mt-[16px]"
                    onClick={() => {
                      setIsOpen(true);
                      setModalContent(review.comment);
                    }}
                  >
                    Show More
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={() => setDisplayedReviewsCount(displayedReviewsCount + 4)}
          className="mt-[16px]"
        >
          <Button>Load more reviews</Button>
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
