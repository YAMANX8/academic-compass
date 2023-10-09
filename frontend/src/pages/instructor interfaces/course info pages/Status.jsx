import { useState } from "react";

const Status = () => {
  const [data, setData] = useState({
    items: 5,
    enrollments: 10,
    reviews: 100,
  });
  return <div>Status</div>;
};

export default Status;
