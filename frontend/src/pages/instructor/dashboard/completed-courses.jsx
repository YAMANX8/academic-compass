import CourseCard from "./components/course-card";
import { useState } from "react";
import { Card, TextField } from "../../../components";
import { Helmet } from "react-helmet-async";
import Image from "../../../assets/images/Rectangle 63.png";

const CompletedCourses = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title:
        "yaman ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      image: Image,
      type: true,
      active: true,
    },
    {
      id: 2,
      title:
        "ahmed ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      image: Image,
      type: true,
      active: false,
    },
    {
      id: 3,
      title:
        "ammar ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      image: Image,
      type: true,
      active: true,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <>
      <Helmet>
        <title>My Completed Courses</title>
      </Helmet>
      <div className="w-full space-y-4">
        <h2>My Completed Courses</h2>
        <Card className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search by course title..."
            className="px-3 h-14 rounded-lg w-80 border border-gray-400/20 outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />{" "}
          {filteredData.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              subtitle={course.subtitle}
              type={course.type}
              active={course.active}
              image={course.image}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default CompletedCourses;
