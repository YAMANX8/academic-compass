import { useState } from "react";

const Info = () => {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    level: "",
    type: "",
    description: "",
    whoFor: ["", "", ""],
    whatLearn: ["", "", ""],
    prerequisites: ["", "", ""],
    thumbnail: "",
    isActive: false,
  });
  return <div>Info</div>;
};

export default Info;
