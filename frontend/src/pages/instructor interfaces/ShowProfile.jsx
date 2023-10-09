import { useState } from "react";

const ShowProfile = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    education: "",
    country: "",
    city: "",
    birth_date: "00-00-0000",
    bio: "",
    picture: "",
  });
  return <div>ShowProfile</div>;
};

export default ShowProfile;
