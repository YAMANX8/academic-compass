import React, { useState } from "react";
import { ProfileCard, PerformanceChart ,PerformanceCard, CourseCard } from "../components/index.js";
import Profile from "../assets/images/frontend.svg";
import { DashboardWrapper } from "../layout/index.js";
import { FaRegMap as Map } from "react-icons/fa";
import { BsArrowReturnLeft as ReturnLeft   } from "react-icons/bs";

import { performance } from "../performance.js";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const cardData = [
  {
    title: "Courses in Progress",
    number: 10,
  },
  {
    title: "Courses Completed",
    number: 5,
  },
  {
    title: "Total Points",
    number: 100,
  },
];

const cardColor = ["bg-primary", "bg-accent", "bg-green"];

function Dashboard_Student() {
  const [data, useData] = useState({
    labaels: performance.map((item) => item.title),
    datasets: [
      {
        label: "performance",
        data: performance.map((item) => item.count),
        backgroundColor: ["#253AD4", "#6A1EAd", "#B67cE8", "#25D42C"],
        borderColor: "#EEEFFC",
      },
    ],
  });

  // My Performance
  const data1 = [
    { title: "Courses Enrolls", color:"border-primary"       ,  count: 10 },
    { title: "Article Read",   color:"border-green"       ,  count: 20 },
    { title: "Quiz Completed",  color:"border-accent"     ,  count: 30 },
    { title: "Video Watched",   color:"border-accent-dark"     ,  count: 40 },
  ];

  // In Progress Courses
  const courses = [
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
      progress: "60",
      
      stars: 4.5,
    },
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
      progress: "80",
      
      stars: 3.5,
    },
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
      progress: "40",
      
      stars: 2,
    },
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
      progress: "40",
      
      stars: 4.5,
    },
  ];

  //  completedCourses
  const completedCourses = [
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
    },
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
    },
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
    },
    {
      image: Profile,
      title: "Course title goes here Course title goes here Course title ...",
      subtitle:
        "Course subtitle goes here goes here goes here goes here ......",
    },
  ];

  const name = "Ahmad Omar";
  const position = "Damascus, Syria";
  const images = { Profile };

  return (
    <section className=" grid grid-cols-12 gap-[20px] grid-rows-8">
      {/* My Profile */}
      <div className=" col-span-8 row-start-1 row-span-2">
        <DashboardWrapper
          heading="My Profile"
          optionalText={`Welcome back, ${name}`}
        >
          <div className="flex justify-between">
            <div>
              <img
                src={images.Profile}
                className="h-[167px] w-[167px] rounded-full"
                alt="Profile"
              />
              <p className="px-[32px] py-[18px] text-text font-poppins  font-semibold leading-[125.5%] tracking-[-0.48px]">
                {name}
              </p>
              <p className="whitespace-nowrap text-primary font-poppins text-base font-semibold leading-[125.5%] tracking-[-0.48px] px-[28px]">
                {position}
              </p>
            </div>
            <div className="flex flex-col  justify-between">
              <div className="flex justify-between gap-[32px] ">
                {cardData.map((card, index) => (
                  <ProfileCard
                    key={index}
                    title={card.title}
                    number={card.number}
                    bgColor={cardColor[index % cardColor.length]}
                  />
                ))}{" "}
              </div>
              <div className=" flex justify-center items-center gap-[10px]  font-semibold h-[44px]   bg-primary text-light rounded-[5px]">
                <Map className="text-[25px]" />
                <button className="  ">Explore Our Roadmap</button>
              </div>
            </div>
          </div>
        </DashboardWrapper>
      </div>

      {/*My Performance */}
      <div className="col-span-4 row-start-1 row-span-3">
        <DashboardWrapper heading={"My Performance"}>
          <div>
            <PerformanceChart chartData={data} />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-[20px]">
            {data1.map((item, index) => (
              <PerformanceCard key={index}
              title={item.title}
              color={item.color}
              count={item.count} />
            ))}
          </div>
        </DashboardWrapper>
      </div>

     
{/* "In Progress Courses" */}
<div className="col-span-8 row-start-3 row-span-3">
  <DashboardWrapper heading="In Progress Courses">
    <div className="flex overflow-x-scroll gap-8">
      {courses.map((course, index) => (
           <CourseCard
           key={index}
           image={course.image}
           title={course.title}
           subtitle={course.subtitle}
           progress={course.progress}
           stars={course.stars}
        />
      ))}
    </div>
  </DashboardWrapper>
</div>

      {/*  Popler Roadmaps */}
      <div className="col-span-4 row-start-4 row-span-2">
        <DashboardWrapper heading={"Popluar Roadmaps"}>
          <div className="grid grid-cols-2  space-x-[55px]  w-[355px] h-[60px]  bg-light rounded-[20px] items-center  flex-shrink-0 rounded-20 ">
            <span className="px-[16px] text-accent font-medium font-poppins text-20 leading-normal tracking[-0.6px]   ">
              Frontend
            </span>
            <button className=" w-[112px] h-[44px] flex justify-center  bg-gradient-to-r from-[#253AD4] to-[#6A1EAD] text-white  rounded-[5px] items-center  ">
              View
              <ReturnLeft className="ml-[10px]  text-[20px]" />
            </button>
          </div>
          <div className="grid grid-cols-2  space-x-[55px]  w-[355px] h-[65px]  bg-light rounded-[20px] items-center  flex-shrink-0 rounded-20 ">
            <span className="px-[16px] text-accent font-medium font-poppins text-20 leading-normal tracking[-0.6px]   ">
              Backend
            </span>
            <button className=" w-[112px] h-[44px] flex justify-center  bg-gradient-to-r from-[#253AD4] to-[#6A1EAD] text-white  rounded-[5px] items-center  ">
              View
              <ReturnLeft className="ml-[10px]  text-[20px]" />
            </button>
          </div>
          <div className="grid grid-cols-2  space-x-[55px]  w-[355px] h-[65px] bg-light rounded-[20px] items-center  flex-shrink-0 rounded-20 ">
            <span className="px-[16px] whitespace-nowrap text-accent font-medium font-poppins text-20 leading-normal tracking[-0.6px]   ">
              Artificial Intelligence
            </span>
            <button className=" w-[112px] h-[44px] flex justify-center  bg-gradient-to-r from-[#253AD4] to-[#6A1EAD] text-white  rounded-[5px] items-center  ">
              View
              <ReturnLeft className="ml-[10px]  text-[20px]" />
            </button>
          </div>
        </DashboardWrapper>
      </div>

      {/*  completed Course */}
      <div className="col-span-12 row-start-6 row-span-3">
        <DashboardWrapper heading={"Completed Courses"}>
          <div className="flex overflow-x-scroll gap-8 pb-4">
          {completedCourses.map((course, index) => (
              <CourseCard
                key={index}
                image={course.image}
                title={course.title}
                subtitle={course.subtitle}
            />
              ))}
          </div>
        </DashboardWrapper>
      </div>
    </section>
  );
}

export default Dashboard_Student;
