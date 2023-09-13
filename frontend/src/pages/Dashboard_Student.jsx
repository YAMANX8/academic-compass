import { useState, useEffect } from "react";
import {
  ProfileCard,
  PerformanceChart,
  PerformanceCard,
  CourseCard,
  Button,
} from "../components/index.js";
import { DashboardWrapper } from "../layout/index.js";
import { FaRegMap as Map } from "react-icons/fa";
import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
import axios from "../apis/axios";
import { performance } from "../performance.js";
import useAuth from "../hooks/useAuth.jsx";

const DASHBOARD_URL = "/studentDashboard";

const cardColor = ["bg-primary", "bg-accent", "bg-green"];
const cardTitle = ["Completed Courses", "In Progress Courses", "Total Points"];

function Dashboard_Student() {
  const { auth } = useAuth();
  const [profileData, setProfileData] = useState([]);

  const [performanceData, setPerformanceData] = useState([]);
  const [progressCourses, setProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [myRoadmaps, setMyRoadmaps] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(DASHBOARD_URL, {
        headers: { token: localStorage.token },
      });
      const data = await response.data;
      setProfileData(data.profileData.counts);
      setPerformanceData(data.performance);
      setProgressCourses(data.progressCourses);
      setCompletedCourses(data.completedCourses);
      setMyRoadmaps(data.myRoadmaps);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  let data = {
    labels: performance.map((item) => item.title),
    datasets: [
      {
        label: "performance",
        data: performanceData.map((item) => item.count),
        backgroundColor: performance.map((item) => item.color),
        borderColor: "#EEEFFC",
      },
    ],
  };

  //styles
  const emptyRows = "font-thin text-[20px] text-dark/70 dark:text-light/70";
  const transition = "transition-colors duration-1000 ease-in-out-back";

  return (
    <section className="max-w-[1200px] grid grid-cols-12 gap-[20px] grid-rows-8">
      {/* My Profile */}
      <div className=" col-span-8 row-start-1 row-span-2">
        <DashboardWrapper
          heading="My Profile"
          optionalText={`Welcome back, ${auth.firstName}`}
        >
          <div className="flex justify-start gap-12">
            <div className="flex flex-col gap-4 text-center justify-center">
              <div className="w-[167px] aspect-square overflow-hidden rounded-full">
                <img
                  src={auth.image}
                  alt="Profile"
                />
              </div>

              <div className="font-semibold leading-l tracking-tight flex flex-col gap-2">
                <p>
                  {auth.firstName} {auth.lastName}
                </p>
                <p className="text-primary">{`${auth.city}, ${auth.country}`}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div className="flex justify-between">
                {profileData.map((card, index) => (
                  <ProfileCard
                    key={card.id.toString()}
                    title={cardTitle[index]}
                    number={card.count}
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
            {performanceData.map((item, index) => (
              <PerformanceCard
                key={item.id}
                title={performance[index].title}
                color={performance[index].color}
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
            {progressCourses.length !== 0 ? (
              progressCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  progress={course.progress[index].completion_percentage}
                  stars={course.rating[index].stars_number}
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
              myRoadmaps.map((roadmap, index) => (
                <div
                  key={index}
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
