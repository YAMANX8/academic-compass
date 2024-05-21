import CourseCard from "./components/course-card";
import { useState } from "react";
import { Card } from "../../../components";
import { Helmet } from "react-helmet-async";
import Image from "../../../assets/images/Rectangle 63.png";

const InprogressCourses = () => {
  const [data, setData] = useState([
    {
      id: 15,
      title: "Local SEO Strategies",
      subtitle: null,
      progressPercentage: "63.64",
      progress: 7,
      thumbnail: Image,
      courseStatus: true,
      type: false,
    },
    {
      id: 16,
      title: "On-Page SEO Techniques",
      subtitle: " Optimize Your Webpages for Better Rankings",
      progressPercentage: "63.64",
      progress: 7,
      thumbnail: Image,
      courseStatus: true,
      type: false,
    },
    {
      id: 17,
      title: "SEO for E-commerce",
      subtitle: " Drive Organic Traffic to Your Online Store",
      progressPercentage: "54.55",
      progress: 6,
      thumbnail: Image,
      courseStatus: true,
      type: false,
    },
    {
      id: 18,
      title: "Introduction to CSS",
      subtitle: " Learn the Basics of Cascading Style Sheets",
      progressPercentage: "54.55",
      progress: 6,
      thumbnail: Image,
      courseStatus: true,
      type: false,
    },
    {
      id: 19,
      title: "CSS Layout Fundamentals",
      subtitle: "Learn the Basics of Creating Web Layouts",
      progressPercentage: "54.55",
      progress: 6,
      thumbnail: Image,
      courseStatus: true,
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
              image={course.thumbnail}
            />
          ))}
        </Card>
      </div>
    </>
  );
};

export default InprogressCourses;
