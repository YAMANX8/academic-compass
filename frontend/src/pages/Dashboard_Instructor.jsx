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
import useAuth from "../hooks/useAuth.jsx";

function Dashboard_Instructor() {
  const { auth } = useAuth();
  const json = {
    instructor_rating: 4.5,
    performance: [
      {
        id: 1,
        title: "Total Enrollments",
        count: 10, // هون العدد اللي بيطلع بالدائرة
      },
      {
        id: 2,
        title: "Total Reviews",
        count: 20, // هون العدد اللي بيطلع بالدائرة
      },
      {
        id: 3,
        title: "Total Courses",
        count: 30, // هون العدد اللي بيطلع بالدائرة
      },
      {
        id: 4,
        title: "Total Students",
        count: 10, // هون العدد اللي بيطلع بالدائرة
      },
    ],
    topics: [
      {
        id: 1,
        roadmap_id: 18,
        title: "HTML",
      },
      {
        id: 2,
        roadmap_id: 18,
        title: "CSS",
      },
    ],
    non_completed_courses: [
      {
        id: 1,
        title:
          "course title goes here course title goes here course title goes here",
        progress: 10, //  هون إذا بدك بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال9 شروط إذا بدك ما بتفرق
        thumnail: "url_to_image.png",
      },
      {
        id: 1,
        title:
          "course title goes here course title goes here course title goes here",
        progress: 10, //  هون إذا بدك بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال9 شروط إذا بدك ما بتفرق
        thumnail: "url_to_image.png",
      },
      {
        id: 1,
        title:
          "course title goes here course title goes here course title goes here",
        progress: 10, //  هون إذا بدك بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال9 شروط إذا بدك ما بتفرق
        thumnail: "url_to_image.png",
      },
      {
        id: 2,
        title:
          "course title goes here course title goes here course title goes here",
        progress: 50,
        thumnail: "url_to_image.png",
      },
    ],
    completed_courses: [
      {
        id: 1,
        title:
          "course title goes here course title goes here course title goes here",
        subtitle:
          "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
        thumnail: "url_to_image.png",
      },
      {
        id: 2,
        title:
          "course title goes here course title goes here course title goes here",
        subtitle:
          "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
        thumnail: "url_to_image.png",
      },
    ],
  };
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
    labels: json.performance.map((item) => item.title),
    datasets: [
      {
        label: "performance",
        // data: performanceData.map((item) => item.count + 0.1),
        data: json.performance.map((item) => item.count + 0.1),
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
      progress: 70, // بدك هون بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال9 شروط
      image: "url_to_image1.jpg",
    },
    {
      id: 2,
      title:
        "course title goes here course title goes here course title goes here",
      subtitle:
        "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
      progress: 70, // بدك هون بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال9 شروط
      image: "url_to_image2.jpg",
    },
    {
      id: 3,
      title:
        "course title goes here course title goes here course title goes here",
      subtitle:
        "course title goes herecourse title goes herecourse title goes herecourse title goes herecourse title goes herecourse tit",
      progress: 70, // بدك هون بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال9 شروط
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
    <section className="max-w-[1200px] grid grid-cols-12 gap-[20px] grid-rows-9">
      <div className=" col-span-8 row-start-1 row-span-2">
        <DashboardWrapper
          heading="My Profile"
          optionalText={`Welcome back, ${auth?.firstName}`}
        >
          <div className="flex gap-8 mt-auto">
            <div className="flex flex-col gap-4 text-center justify-center">
              <div className="w-[167px] aspect-square overflow-hidden rounded-full bg-primary text-light flex justify-center items-center text-3xl">
                {auth.image ? (
                  <img
                    src={auth.image}
                    className="object-cover"
                    alt="profile picture"
                  />
                ) : (
                  <span>
                    {auth.firstName.charAt(0)} {auth.lastName.charAt(0)}
                  </span>
                )}
              </div>
              <div className="font-semibold leading-l tracking-tight flex flex-col gap-2">
                <p>
                  {auth.firstName} {auth.lastName}
                </p>
                <p className="text-primary">{`${auth.city}, ${auth.country}`}</p>
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <div className="bg-light rounded-[20px]">
                <div className="p-4">
                  <p className="text-dark text-center font-medium tracking-tight">
                    Ratings in average
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-[48px]  font-semibold tracking-tight dark:text-da">
                      {json.instructor_rating}
                    </span>
                    <div className="flex gap-[8px]">
                      {[...Array(Math.floor(json.instructor_rating))].map(
                        (_, index) => (
                          <Full
                            key={index}
                            className="text-yellow-500 text-[24px]"
                          />
                        )
                      )}
                      {json.instructor_rating % 1 !== 0 && (
                        <Half className="text-yellow-500 text-[24px]" />
                      )}
                      {[...Array(5 - Math.ceil(json.instructor_rating))].map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="text-yellow-500 text-[24px]"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button>
                Create a course <Add className="text-3xl" />
              </Button>
            </div>
          </div>
        </DashboardWrapper>
      </div>

      {/*My Performance */}
      <div className="col-span-4 row-start-1 row-span-4">
        <DashboardWrapper heading={"My Performance"}>
          <div className="p-4">
            <PerformanceChart chartData={Data1} />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-[19px] mt-auto">
            {json.performance.map((item, index) => (
              <PerformanceCard
                key={item.id}
                title={item.title}
                color={PerformanceInstructor[index].color}
                count={item.count}
              />
            ))}
          </div>
        </DashboardWrapper>
      </div>

      {/* My Non-completed Courses */}
      <div className="col-span-8 row-start-3 row-span-4">
        <DashboardWrapper heading="My Non-completed Courses">
          <div className="flex flex-col overflow-y-auto p-4 gap-8">
            {json.non_completed_courses.map((course) => (
              <div
                key={course.id}
                className="bg-light shadow-[0_0_10px] shadow-black/40 rounded-[10px]"
              >
                <div className="flex">
                  <div className="flex min-w-[50%] aspect-video bg-accent-dark rounded-bl-[10px] rounded-tl-[10px]">
                    <img className="object-contain" src={Course1} />
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-4">
                    <label className="text-dark tracking-tight text-[24px] leading-[100%] font-semibold">
                      {course.title}
                    </label>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-300 rounded mb-4">
                        <div
                          className="h-full bg-blue-500 rounded"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="">
                        <Button>
                          Continue Editing <Continue className="text-2xl" />
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
      <div className="col-span-4 row-start-5 row-span-2">
        <DashboardWrapper heading={"My Topics"}>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {json.topics.length !== 0 ? (
              json.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="justify-center items-center rounded-[10px] dark:bg-dark text-[24px]"
                >
                  <Button
                    page={`/student/roadmaps/${topic.roadmap_id}/${topic.id}`}
                  >
                    {topic.title}
                  </Button>
                </div>
              ))
            ) : (
              <div className="m-auto">You don't have any topics yet!</div>
            )}
          </div>
        </DashboardWrapper>
      </div>

      {/*  My Courses */}
      <div className="col-span-12 row-start-7 row-span-3">
        <DashboardWrapper heading={"My Courses"}>
          <div className="overflow-y-auto p-4 flex flex-col gap-8">
            {json.completed_courses.map((course) => (
              <div
                key={course.id}
                className="flex bg-light shadow-[0_0_10px] shadow-black/40 rounded-[10px]"
              >
                <div className="flex min-w-[520px] aspect-video bg-accent-dark rounded-bl-[10px] rounded-tl-[10px]">
                  <img className="object-contain" src={Course1} />
                </div>
                <div className="flex flex-col justify-between flex-1 p-4">
                  <div>
                    <p className="text-dark tracking-tight text-[24px] leading-l font-semibold">
                      {course.title}
                    </p>
                    <p className="text-gray-500 tracking-tight text-[24px] leading-l font-semibold">
                      {course.subtitle}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Button page="/">
                        Edit Again <Continue className="text-2xl" />
                      </Button>
                    </div>
                    <div className="flex-1">
                      <Button page="/">
                        Show Course Info <ReturnLeft className="text-2xl" />
                      </Button>
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
