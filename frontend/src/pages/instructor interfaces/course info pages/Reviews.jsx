import { useState } from "react";

const Reviews = () => {
  const [data, setData] = useState([
    {
      id: 1,
      fname: "Ammar",
      lname: "Al-Esrawi",
      stars: 5,
      img: "image path",
      data: "05-05-2023",
      comment: "the review body",
    },
    {
      id: 2,
      fname: "Yaman",
      lname: "Al-Jazzar",
      stars: 5,
      img: "image path",
      data: "05-05-2023",
      comment: "the review body",
    },
  ]);
  return <div>Reviews</div>;
};

export default Reviews;
