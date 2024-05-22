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

const Overview = () => {
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
      <div>
        <DashboardWrapper
          heading="My Profile"
          optionalText={`Welcome back, ${user?.first_name}`}
        >
          <div className="mt-auto flex gap-8">
            <div className="flex flex-1 flex-col gap-8">
              <div className="rounded-[20px] bg-light text-dark transition-colors duration-1000 ease-in-out-back dark:bg-dark dark:text-light">
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
                            className="text-[24px] text-yellow-500"
                          />
                        ),
                      )}
                      {json.instructor_rating % 1 !== 0 && (
                        <Half className="text-[24px] text-yellow-500" />
                      )}
                      {[...Array(5 - Math.ceil(json.instructor_rating))].map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="text-[24px] text-yellow-500"
                          />
                        ),
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
      <div>
        <DashboardWrapper heading={"My Performance"}>
          <div className="p-4">
            <PerformanceChart chartData={Data1} />
          </div>
          <div className="mt-auto grid grid-cols-2 grid-rows-2 gap-[19px]">
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
    </>
  );
};

export default Overview;
