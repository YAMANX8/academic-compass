import React, { useState, useEffect } from "react";
import {
  PerformanceChart,
  PerformanceCard,
  Button,
} from "src/components/index.js";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
  BsPlus as Add,
  BsFillPencilFill as Continue,
  BsArrowReturnLeft as ReturnLeft,
} from "react-icons/bs";
import { DashboardWrapper } from "src/layout/index.js";
import { PerformanceInstructor } from "src/constants/PerformanceInstructor.js";
import { useAuthContext } from "src/auth/hooks";
import axios from "src/apis/axios.js";
import { Helmet } from "react-helmet-async";
import { paths } from "src/routes/paths.js";
function InstructorDashboard() {
  const { user } = useAuthContext();
  const [json, setJson] = useState({
    instructor_rating: 4.5,
    performance: [
      {
        id: 1,
        title: "Total Enrollments",
        count: 20,
      },
      {
        id: 2,
        title: "Total Reviews",
        count: 30,
      },
      {
        id: 3,
        title: "Total Courses",
        count: 10,
      },
      {
        id: 4,
        title: "Total Students",
        count: 40,
      },
    ],
    topics: [
      {
        id: 2,
        roadmap_id: 18,
        title: "test",
      },
    ],
    non_completed_courses: [
      {
        id: 0,
        title: "",
        progress: 0, //  هون إذا بدك بعات نسبة مئوية أو عدد الشروط اللي مخلصها الكورس من ال10 شروط إذا بدك ما بتفرق
        thumnail: "",
      },
    ],
    completed_courses: [
      {
        id: 0,
        title: "",
        subtitle: "",
        thumnail: "",
      },
    ],
  });
  const [performanceData, setPerformanceData] = useState([]);
  const Data1 = {
    labels: json.performance.map((item) => item.title),
    datasets: [
      {
        label: "performance",
        // data: performanceData.map((item) => item.count + 0.1),
        data: json.performance.map((item) => item.count + 0.1),
        backgroundColor: performanceData.map((item) => item.color),
        borderColor: "#EEEFFC",
      },
    ],
  };
  const userInfo = {
    firstName: user?.first_name == null ? "" : user?.first_name,
    lastName: user?.last_name == null ? "" : user?.last_name,
    imagePath:
      user?.picture == "http://localhost:5000/image/null" ? "" : user?.picture,
  };
  useEffect(() => {
    setPerformanceData(PerformanceInstructor);
    const getData = async () => {
      const res = await axios.get(`/instructor/dashboard`, {
        headers: {
          token: user?.accessToken,
        },
      });
      setJson(res.data);
    };
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Dashboard: {user?.first_name || "[user name]"}</title>
      </Helmet>
      <section className="max-w-[1200px] grid grid-cols-12 gap-[20px] grid-rows-9">
        <div className=" col-span-8 row-start-1 row-span-2">
          <DashboardWrapper
            heading="My Profile"
            optionalText={`Welcome back, ${user?.first_name}`}
          >
            <div className="flex gap-8 mt-auto">
              <div className="flex flex-col gap-4 text-center justify-center">
                <div className="w-[167px] aspect-square overflow-hidden rounded-full bg-primary text-light flex justify-center items-center text-3xl">
                  {userInfo.imagePath ? (
                    <img
                      src={userInfo.imagePath}
                      className="object-cover"
                      alt="profile picture"
                    />
                  ) : (
                    <span>
                      {userInfo.firstName.charAt(0)}{" "}
                      {userInfo.lastName.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="font-semibold leading-l tracking-tight flex flex-col gap-2">
                  <p>
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="text-primary">{`${user?.city}, ${user?.country}`}</p>
                </div>
              </div>
              <div className="flex flex-col gap-8 flex-1">
                <div className="bg-light dark:bg-dark text-dark dark:text-light rounded-[20px] transition-colors duration-1000 ease-in-out-back">
                  <div className="p-4">
                    <p className="text-center font-medium tracking-tight">
                      Ratings in average
                    </p>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-[48px] font-semibold tracking-tight">
                        {json?.instructor_rating ? json.instructor_rating : 0}
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
                <Button page={paths.course.manage.create}>
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
                  count={item?.count ? item.count : 0}
                />
              ))}
            </div>
          </DashboardWrapper>
        </div>

        {/* My Non-completed Courses */}
        <div className="col-span-8 row-start-3 row-span-4">
          <DashboardWrapper heading="My Non-completed Courses">
            {json.non_completed_courses.length !== 0 ? (
              <div className="flex flex-col overflow-y-auto p-4 gap-8">
                {json.non_completed_courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-1000 ease-in-out-back shadow-[0_0_10px] shadow-black/40 rounded-[10px]"
                  >
                    <div className="flex">
                      <div className="w-[50%] bg-accent-dark rounded-bl-[10px] rounded-tl-[10px]">
                        <img
                          className="object-cover aspect-video"
                          src={`http://localhost:5000/image/${course.thumnail}`}
                          alt="course thumnail"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between p-4">
                        <label className="tracking-tight text-[24px] leading-[100%] font-semibold">
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
                            <Button
                              page={`${paths.course.manage.edit}/${course.id}`}
                            >
                              Continue Editing <Continue className="text-2xl" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="m-auto">
                You don't have any course under construction yet!
              </div>
            )}
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
                      page={`${paths.roadmaps}/${topic.roadmap_id}/${topic.id}`}
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
            {json.completed_courses.length !== 0 ? (
              <div className="overflow-y-auto p-4 flex flex-col gap-8">
                {json.completed_courses.map((course) => (
                  <div
                    key={course.id}
                    className="flex bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-1000 ease-in-out-back shadow-[0_0_10px] shadow-black/40 rounded-[10px]"
                  >
                    <div className="flex min-w-[520px] aspect-video bg-accent-dark rounded-bl-[10px] rounded-tl-[10px]">
                      <img className="object-contain" src={course.thumnail} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div>
                        <p className="tracking-tight text-[24px] leading-l font-semibold">
                          {course.title}
                        </p>
                        <p className="text-gray-500 tracking-tight text-[24px] leading-l font-semibold">
                          {course.subtitle}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Button page={`${paths.course.manage.edit}/${course.id}`}>
                            Edit Again <Continue className="text-2xl" />
                          </Button>
                        </div>
                        <div className="flex-1">
                          <Button page={`${paths.course.manage.monitor}/${course.id}`}>
                            Monitor Course Info <ReturnLeft className="text-2xl" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="m-auto">
                You don't have any completed course yet!
              </div>
            )}
          </DashboardWrapper>
        </div>
      </section>
    </>
  );
}

export default InstructorDashboard;
