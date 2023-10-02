import React from "react";
import { useParams } from "react-router-dom";
const Review = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Review;
