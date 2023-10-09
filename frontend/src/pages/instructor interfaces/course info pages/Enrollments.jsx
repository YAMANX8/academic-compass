import { useState } from "react";

const Enrollments = () => {
  const [data, setData] = useState([
    {
      id: 1,
      first_name: "Ahmed",
      last_name: "Sadek",
      picture: "image path",
      enroll_date: "05-05-2023",
      country: "Syria",
    },
    {
      id: 2,
      first_name: "Ahmed",
      last_name: "Omar",
      picture: "image path",
      enroll_date: "05-05-2023",
      country: "Syria",
    },
  ]);
  return <div>Enrollments</div>;
};

export default Enrollments;
