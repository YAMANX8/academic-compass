import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Ratings, Button } from "../../../components";

const data = {
  course_title: "HTML Basics for Beginners",
  reviews: [
    {
      id: 9,
      fname: "Ammar",
      lname: "AL-Esrawi",
      stars: 2.5,
      img: "http://localhost:5000/image/image-1694866674110-484876443.jpg",
      date: "2023-05-05",
      comment:
        "wooow Lorem ipsum dolor sit amet consectetur. In turpis donec sed eget massa diam faucibus lobortis. Adipiscing id sed sed et lorem lorem diam malesuada id. Pharetra risus pulvinar felis ac. Vitae turpis fermentum dignissim tellus.",
    },
    {
      id: 11,
      fname: "Ahmad",
      lname: "Sadek",
      stars: 5,
      img: "http://localhost:5000/image/image-1695566128570-467521694.jpg",
      date: "2023-05-05",
      comment:
        "wooow Lorem ipsum dolor sit amet consectetur. In turpis donec sed eget massa diam faucibus lobortis. Adipiscing id sed sed et lorem lorem diam malesuada id. Pharetra risus pulvinar felis ac. Vitae turpis fermentum dignissim tellus.",
    },
    {
      id: 18,
      fname: "Ammar",
      lname: "alesrawi",
      stars: 2,
      img: "http://localhost:5000/image/null",
      date: "2023-05-05",
      comment:
        "Lorem ipsum dolor sit amet consectetur. In turpis donec sed eget massa diam faucibus lobortis. Adipiscing id sed sed et lorem lorem diam malesuada id. Pharetra risus pulvinar felis ac. Vitae turpis fermentum dignissim tellus.",
    },
    {
      id: 19,
      fname: "Ammar",
      lname: "alesrawi",
      stars: 5,
      img: "http://localhost:5000/image/null",
      date: "2023-05-05",
      comment:
        "Lorem ipsum dolor sit amet . In turpis donec sed eget massa diam faucibus lobortis. Adipiscing id sed sed et lorem lorem diam malesuada id. Pharetra risus pulvinar felis ac. Vitae turpis fermentum dignissim tellus.!",
    },
  ],
};

const Reviews = () => {
  const { course_title, reviews } = data;
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <Helmet>
        <title>{course_title}</title>
      </Helmet>
      <h1 className="mb-6 text-2xl font-bold">{course_title}</h1>
      <div className="flex min-h-screen justify-center bg-secondary-lighter p-6 rounded">
        <div className="w-full max-w-screen-lg">
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {reviews.map((review) => (
                <Card
                  key={review.id}
                  className="rounded-lg border-2 border-dashed border-gray-400 bg-white p-6 shadow-md"
                >
                  <div className="mb-4 flex items-center">
                    <img
                      className="mr-4 h-14 w-14 rounded-full"
                      src={
                        review.img !== "http://localhost:5000/image/null"
                          ? review.img
                          : "default_image_url"
                      }
                      alt={`${review.fname} ${review.lname}`}
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{`${review.fname} ${review.lname}`}</h4>
                      <div className="flex items-center gap-2">
                        <Ratings rating={review.stars} />
                        <p className="text-sm text-primary-dark">{review.date}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`mb-4 text-gray-700 ${
                      expanded[review.id] ? "" : "line-clamp-3"
                    }`}
                  >
                    {review.comment}
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => toggleExpand(review.id)}>
                      {expanded[review.id] ? "Show less" : "Show more"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-error font-semibold">
              No commit available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
