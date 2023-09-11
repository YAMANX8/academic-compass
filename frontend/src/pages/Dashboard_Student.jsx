import React, { useState,useEffect } from "react";
import {
  ProfileCard,
  PerformanceChart,
  PerformanceCard,
  CourseCard,
  Button,
} from "../components/index.js";
import Profile from "../assets/images/frontend.svg";
import { DashboardWrapper } from "../layout/index.js";
import { FaRegMap as Map } from "react-icons/fa";
import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
import axios from "../apis/axios";
import { performance } from "../performance.js";

const DASHBOARD_URL = "/studentDashboard";




const cardColor = ["bg-primary", "bg-accent", "bg-green"];

function Dashboard_Student() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    counts: []
  });
  
  const [performanceData, setPerformanceData] = useState([]);
  const [progressCourses, setProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [myRoadmaps, setMyRoadmaps] = useState([]);
  
  useEffect(() => {
    axios.get(DASHBOARD_URL,{headers:{token:localStorage.token}})
      .then(response => {
        console.log(response.data);  
        setProfileData(response.data.profileData);
        setPerformanceData(response.data.performanceData);
        setProgressCourses(response.data.progressCourses);
        setCompletedCourses(response.data.completedCourses);
        setMyRoadmaps(response.data.myRoadmaps);
      })
      .catch(error => {
        console.error("Errer fetching date:", error);
      });
  }, []);


  const [data, setData] = useState({
       labels: performance.map((item) => item.title),  
    datasets: [
      {
        label: "performance",
        data: performance.map((item) => item.count),
        backgroundColor: performance.map((item) => item.color),
        borderColor: "#EEEFFC",
      },
    ],
});



 


  const firstName = profileData.firstName;
  const lastName = profileData.lastName;
  const location = `${profileData.city}, ${profileData.country}`;
  const images = { Profile };
  const cardData = profileData.counts;//للصورة

  //styles
  const emptyRows = "font-thin text-[20px] text-dark/70 dark:text-light/70";
  const transition = "transition-colors duration-1000 ease-in-out-back";

  return (
    <section className="max-w-[1200px] grid grid-cols-12 gap-[20px] grid-rows-8">
      {/* My Profile */}
      <div className=" col-span-8 row-start-1 row-span-2">
        <DashboardWrapper
          heading="My Profile"
          optionalText={`Welcome back, ${firstName}`}
        >
          <div className="flex justify-start gap-12">
            <div className="flex flex-col gap-4 text-center justify-center">
              <img
                src={images.Profile}
                className="h-[167px] w-[167px] rounded-full"
                alt="Profile"
              />

              <div className="font-semibold leading-l tracking-tight flex flex-col gap-2">
                <p>
                  {firstName} {lastName}
                </p>
                <p className="text-primary">{location}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div className="flex justify-between">
                {cardData.map((card, index) => (
                  <ProfileCard
                    key={index}
                    title={card.title}
                    number={card.number}
                    bgColor={cardColor[index % cardColor.length]}
                  />
                ))}
              </div>

              <Button page={"/student/roadmaps"}>
                <Map className="text-[25px]" /> Explore Our Roadmap
              </Button>
            </div>
          </div>
        </DashboardWrapper>
      </div>

      {/*My Performance */}
      <div className="col-span-4 row-start-1 row-span-3">
        <DashboardWrapper heading={"My Performance"}>
          <div className="p-4">
            <PerformanceChart chartData={data} />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-[19px]">
            {performance.map((item, index) => (
              <PerformanceCard
                key={index}
                title={item.title}
                color={item.color}
                count={item.count}
              />
            ))}
          </div>
        </DashboardWrapper>
      </div>

      {/* "In Progress Courses" */}
      <div className="col-span-8 row-start-3 row-span-3">
        <DashboardWrapper heading="In Progress Courses">
          <div className="flex overflow-x-auto gap-8 p-4">
          {progressCourses && progressCourses.length !== 0 ? (
              progressCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  progress={course.progress}
                  stars={course.stars}
                />
              ))
            ) : (
              <div className={`${emptyRows} mb-[300px] text-center w-full`}>
                You don't have any courses in progress yet!
              </div>
            )}
          </div>
        </DashboardWrapper>
      </div>

      {/*  My Roadmaps */}
      <div className="col-span-4 row-start-4 row-span-2">
        <DashboardWrapper heading={"My Roadmaps"}>
          <div className="flex flex-col gap-4 overflow-y-auto h-[285px] pr-4">
            {myRoadmaps.length !== 0 ? (
              myRoadmaps.map((roadmap) => (
                <div
                  key={roadmap.id}
                  className={`${transition} flex justify-between items-center rounded-[20px] p-4 bg-light dark:bg-dark`}
                >
                  <span
                    className={`${transition} text-accent dark:text-accent-dark font-medium`}
                  >
                    {roadmap.title}
                  </span>
                  <Button page="/student/roadmaps">
                    View
                    <ReturnLeft className="text-[20px]" />
                  </Button>
                </div>
              ))
            ) : (
              <div className={`m-auto ${emptyRows}`}>
                You don't have any learning roadmap yet!
              </div>
            )}
          </div>
        </DashboardWrapper>
      </div>

      {/*  completed Course */}
      <div className="col-span-12 row-start-6 row-span-3">
        <DashboardWrapper heading={"Completed Courses"}>
          <div className="flex overflow-x-auto gap-8 p-4">
            {completedCourses.length !== 0 ? (
              completedCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                />
              ))
            ) : (
              <div className={`${emptyRows} my-[250px] text-center w-full`}>
                You don't have any completed courses yet!
              </div>
            )}
          </div>
        </DashboardWrapper>
      </div>
    </section>
  );
}

export default Dashboard_Student;
