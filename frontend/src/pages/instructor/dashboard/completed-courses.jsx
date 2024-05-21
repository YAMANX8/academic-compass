import CourseCard from "./components/course-card";
import { useState, useEffect } from "react";
import { Card } from "../../../components";
import { Helmet } from "react-helmet-async";
import Image from "../../../assets/images/Rectangle 63.png";
import { useGetCompletedCourses } from "../../../apis/instructor";

const CompletedCourses = () => {
  const getData = useGetCompletedCourses();

  const [data, setData] = useState([
    {
      id: 1,
      title:
        "yaman ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      thumbnail: Image,
      type: true,
      courseStatus: true,
    },
    {
      id: 2,
      title:
        "ahmed ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      thumbnail: Image,
      type: true,
      courseStatus: false,
    },
    {
      id: 3,
      title:
        "ammar ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, praesentium minima a eos eligendi officiis cumque ea, magni dolores consequuntur, possimus nobis iure repellendus facere harum incidunt doloremque officia culpa.",
      thumbnail: Image,
      type: true,
      courseStatus: true,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        // console.log(res);

        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
            className="h-14 w-80 rounded-lg border border-gray-400/20 px-3 outline-none"
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
              active={course.courseStatus}
              image={course.thumbnail}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default CompletedCourses;
