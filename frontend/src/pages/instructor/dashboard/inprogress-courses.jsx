import CourseCard from "./components/course-card";
import { useState, useEffect } from "react";
import { Card, TextField } from "../../../components";
import { Helmet } from "react-helmet-async";
import Image from "../../../assets/images/Rectangle 63.png";
import { useGetInprogressCourses } from "../../../apis/instructor";
const InprogressCourses = () => {
  const getData = useGetInprogressCourses();
  const [data, setData] = useState([
    {
      id: 0,
      title: "[COURSE_TITLE]",
      subtitle: "[COURSE_SUBTITLE]",
      progress: 0,
      thumbnail: Image,
      courseStatus: false,
      type: false,
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
        <title>My Inprogress Courses</title>
      </Helmet>
      <div className="w-full space-y-4">
        <h2>My Inprogress Courses</h2>
        <Card className="flex flex-col gap-4">
          <TextField
            label="search"
            className="w-80"
            size="sm"
            placeholder="Your course title"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredData.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              subtitle={course.subtitle}
              type={course.type}
              image={course.thumbnail}
              progress={course.progress}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default InprogressCourses;
