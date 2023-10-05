import React, { useState, useEffect } from "react";
import {
  PerformanceChart,
  PerformanceCard,
  Button,
} from "../components/index.js";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
  BsPlus as Add,
  BsFillPencilFill as Continue,
  BsArrowReturnLeft as ReturnLeft,
} from "react-icons/bs";
import Course1 from "../assets/images/Group 210 (1).png";
import { DashboardWrapper } from "../layout/index.js";
import { PerformanceInstructor } from "./PerformanceInstructor.js";

function Dashboard_Instructor() {
  const [performanceData, setPerformanceData] = useState([]);
//   const [courses, setCourses] = useState([]);

  // //   useEffect(() => {
  //     axios.get('/path_to_api/courses')
  //     .then(response => setCourses(response.data))
  //     .catch(error => console.error('Error fetching courses:', error));
  // }, []);

  //   const [userInfo, setUserInfo] = useState({});

  //   useEffect(() => {
  //     async function fetchData() {
  //       const response = await fetch('/path');
  //       const data = await response.json();
  //       setUserInfo(data);
  //     }

  //     fetchData();
  //   }, []);
  useEffect(() => {
    setPerformanceData(PerformanceInstructor);
  }, []);

  const Data1 = {
    labels: PerformanceInstructor.map((item) => item.title),
    datasets: [
      {
        label: "performance",
        data: performanceData.map((item) => item.count + 0.1),
        backgroundColor: PerformanceInstructor.map((item) => item.color),
        borderColor: "#EEEFFC",
      },
    ],
  };
  const course = [
    {
      id: 1,
      title:
        "course title goes here course title goes here course title goes here",
      subtitle:
        "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
      progress: 70,
      image: "url_to_image1.jpg",
    },
    {
      id: 2,
      title:
        "course title goes here course title goes here course title goes here",
      subtitle:
        "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
      progress: 33,
      image: "url_to_image2.jpg",
    },
    {
      id: 3,
      title:
        "course title goes here course title goes here course title goes here",
      subtitle:
        "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
      progress: 85,
      image: "url_to_image3.jpg",
    },
    {
      id: 5,
      title:
        "course title goes here course title goes here course title goes here",
      subtitle:
        "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
      progress: 32,
      image: "url_to_image3.jpg",
    },
    {
      id: 6,
      title:
        "course title goes here course title goes here course title goes here",
      progress: 20,
      image: "url_to_image3.jpg",
    },
  ];
  const data = {
    firstName: "Ahmad",
    lastName: "Omar",
    city: "Damascus",
    country: "Syria",
    imagePath: null,
    rating: "2.5",
  };
  const MyTopics = [
    {
      id: 1,
      title: "HTML",
    },
    {
      id: 2,
      title: "CSS",
    },
    {
      id: 3,
      title: "React.js",
    },
    {
      id: 4,
      title: "Node.js",
    },
    {
      id: 5,
      title: "Databases and SQL",
    },
  ];

  return (
    <section className="max-w-[1200px] grid grid-cols-12 gap-[20px] grid-rows-8">
      <div className=" col-span-8 row-start-1 row-span-2">
        <DashboardWrapper
          heading="My Profile"
          optionalText={`Welcome back, ${data?.firstName}`}
        >
          <div className="flex gap-8">
            <div>
              <div className="w-[167px]  h-[167px] overflow-hidden rounded-full bg-primary text-light flex justify-center items-center text-3xl mb-4">
                {data?.imagePath ? (
                  <img
                    src={data.imagePath}
                    className="object-cover w-full h-full"
                    alt="profile picture"
                  />
                ) : (
                  <span>
                    {data?.firstName.charAt(0)} {data?.lastName.charAt(0)}
                  </span>
                )}
              </div>

              <div className="font-semibold leading-l tracking-tight flex flex-col gap-2 mb-4">
                <p>
                  {data?.firstName} {data?.lastName}
                </p>
                <p className="text-primary">
                  {data?.city}, {data?.country}
                </p>
              </div>
            </div>

            <div className=" w-[546px] h-[155px] bg-light rounded-[20px] ">
              <div className="mt-4 mb-2">
                <p className="text-dark text-center font-medium tracking-tight">
                  Ratings in average
                </p>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-[48px]  font-semibold tracking-tight dark:text-da">
                    {data?.rating}
                  </span>
                  <div className="flex gap-[8px]">
                    {[...Array(Math.floor(data.rating))].map((_, index) => (
                      <Full
                        key={index}
                        className="text-yellow-500 text-[24px]"
                      />
                    ))}
                    {data.rating % 1 !== 0 && (
                      <Half className="text-yellow-500 text-[24px]" />
                    )}
                    {[...Array(5 - Math.ceil(data.rating))].map((_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-500 text-[24px]"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="py-[37px] ">
                <Button className="bg-blue-600 text-light py-2 px-4 rounded flex ">
                  Create a course <Add className="  text-3xl gap-[10px]" />
                </Button>
              </div>
            </div>
          </div>
        </DashboardWrapper>
      </div>

      {/*My Performance */}
      <div className="col-span-4 row-start-1 row-span-3">
        <DashboardWrapper heading={"My Performance"}>
          <div className="p-4">
            <PerformanceChart chartData={Data1} />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-[19px]">
            {performanceData.map((item, index) => (
              <PerformanceCard
                key={item.id}
                title={PerformanceInstructor[index].title}
                color={PerformanceInstructor[index].color}
                count={item.count}
              />
            ))}
          </div>
        </DashboardWrapper>
      </div>

      {/* My Non-completed Courses */}
      <div className="col-span-8 row-start-3 row-span-3">
        <DashboardWrapper heading="My Non-completed Courses">
          <div className=" h-[450px] overflow-y-scroll  ">
            {course.map((course) => (
              <div
                key={course.id}
                className="w-[732px] mr-[16px] h-[191px] mb-[33px]  bg-light  shadow-[0_0_10px] shadow-black/40 rounded-[10px] "
              >
                <div className="flex mb-4">
                  <div className="  mr-[18px] ">
                    <img src={Course1} alt="Course Image" className="" />
                  </div>
                  <div className="flex-1 mr-[12px] ">
                    <div className="mb-4">
                      <label className="text-dark tracking-tight text-[24px] leading-l font-semibold mb-2">
                        {course.title}
                      </label>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-300 rounded mb-4">
                        <div
                          className="h-full bg-blue-500 rounded"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="">
                        <Button className="">
                          Continue Editing <Continue className="  text-2xl" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardWrapper>
      </div>

      {/*  My Topics */}
      <div className="col-span-4 row-start-4 row-span-2">
        <DashboardWrapper heading={"My Topics"}>
          <div className="flex flex-col gap-4 overflow-y-auto h-[285px] pr-4">
            {MyTopics.length !== 0 ? (
              MyTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="justify-center  items-center rounded-[20px] py-3  dark:bg-dark"
                >
                  <Button page="/student/roadmaps">{topic.title}</Button>
                </div>
              ))
            ) : (
              <div className="m-auto">You don't have any topics yet!</div>
            )}
          </div>
        </DashboardWrapper>
      </div>

      {/*  My Courses */}
      <div className="col-span-12 row-start-6 row-span-3">
        <DashboardWrapper heading={"My Courses"}>
          <div className=" h-[450px] overflow-y-scroll  ">
            {course.map((course) => (
              <div
                key={course.id}
                className=" mr-[16px] w-[1139px] h-[292px]  mb-[33px]  bg-light  shadow-[0_0_10px] shadow-black/40 rounded-[10px] "
              >
                <div className="flex mb-4">
                  <div className="  mr-[18px]  ">
                    <img
                      src={Course1}
                      alt="Course Image"
                      className="w-[520px] h-[292px]"
                    />
                  </div>
                  <div className="flex-1 mr-[12px] ">
                    <div className="mb-4">
                      <label className="text-dark tracking-tight text-[24px] leading-l font-semibold mb-2">
                        {course.title}
                      </label>
                    </div>
                    <div className="mb-4">
                      <label className="text-gray-500 tracking-tight text-[24px] leading-l font-semibold mb-2">
                        {course.subtitle}
                      </label>
                    </div>
                    <div className="mb-4">
                     
                     
                      <div className=" flex   justify-between gap-[16px] py-[54px]">
                        <button className=" flex justify-center items-center gap-[10px] px-[84px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
                          Edit Again <Continue className="text-2xl" />
                        </button>
                        <button className=" flex justify-center items-center gap-[10px] px-[58px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
                          Show Course Info <ReturnLeft className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardWrapper>
      </div>
    </section>
  );
}

export default Dashboard_Instructor;
