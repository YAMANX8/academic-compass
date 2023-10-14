import React, { useState, useEffect } from "react";
import axios from "axios";
import Enrollments from "./course info pages/Enrollments";
import Reviews from "./course info pages/Reviews";
import Status from "./course info pages/Status";
const CourseInfo = () => {
  const [currentView, setCurrentView] = useState("Enrollments");
  const [courseReviews, setCourseReviews] = useState([]);

  // بيانات Course status
  const [statistics, setStatistics] = useState({
    items: 5,
    enrollments: 10,
    reviews: 100,
  });

  // بيانات Reviews
  const Profile = "path_to_profile_image";
  const Card = "path_to_card_image";
  const [course, setCourse] = useState({
    reviews: [
      {
        id: 1,
        fname: "Ahmed",
        lname: "Omer",
        images: Profile,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 2,
        fname: "Yaman",
        lname: "Al-Jazzar",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 3,
        fname: "Ahmed",
        lname: "Sadek",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 4,
        fname: "Ammar",
        lname: "Al-Essrawi",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        become quite outdated, and many things have changed, so`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 5,
        fname: "Ammar",
        lname: "Al-Essrawi",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 6,
        fname: "Ammar",
        lname: "Al-Essrawi",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 7,
        fname: "Ammar",
        lname: "Al-Essrawi",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so`,
        data: "12/12/2023",
        img: Profile,
      },
      {
        id: 8,
        fname: "Ammar",
        lname: "Al-Essrawi",
        image: Card,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so`,
        data: "12/12/2023",
        img: Profile,
      },
    ],
  });

  //بيانات Enrollments
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      first_name: "Ahmed",
      last_name: "omar",
      picture: "image path",
      enroll_date: "05-05-2023",
      country: "Syria",
    },
    {
      id: 2,
      first_name: "Ammar",
      last_name: "Al-Esrawi",
      picture: "image path",
      enroll_date: "05-05-2023",
      country: "Syria",
    },
    {
      id: 3,
      first_name: "Yaman",
      last_name: "Al-Jazzer",
      picture: "image path",
      enroll_date: "05-05-2023",
      country: "Syria",
    },
    {
      id: 4,
      first_name: "Ahmad",
      last_name: "Sadek",
      picture: "image path",
      enroll_date: "05-05-2023",
      country: "Syria",
    },
  ]);

  // useEffect(() => {
  // Fetch course statistics

  //   axios.get("https://example.com/api/courseStatistics.............ط")
  //     .then((response) => {
  //       setStatistics(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error statistics ",
  //        error);
  //     });

  //   // Fetch course enrollments

  //   axios.get("https://example.com/api/courseEnrollments..............ظ")
  //     .then((response) => {
  //       setUsersData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error enrollments"
  //       , error);
  //     });

  //   // Fetch course reviews

  //   axios.get("https://example.com/api/courseReviews..................")
  //     .then((response) => {
  //       setCourseReviews(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error  reviews",
  //       error);
  //     });
  // }, []);

  return (
    <main className="w-[1200px]">
      <div
        className="p-[32px] rounded-[3px] border-2 dark:border"
        style={{ boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex gap-[50px] pb-[48px] items-center justify-center">
          <button
            onClick={() => setCurrentView("Enrollments")}
            className={`hover:bg-accent hover:text-light hover:shadow-lg hover:shadow-black/40 active:bg-primary rounded-lg p-[24px] ${
              currentView === "Enrollments"
                ? "text-accent dark:text-accent-dark"
                : "text-dark dark:text-light"
            } font-semibold text-[32px] tracking-tight`}
          >
            Enrollments
          </button>
          <div className="h-[80px] w-[2px] bg-gray-400"></div>
          <button
            onClick={() => setCurrentView("CourseStatus")}
            className={`hover:bg-accent hover:text-light hover:shadow-lg hover:shadow-black/40 active:bg-primary rounded-lg p-[24px] ${
              currentView === "CourseStatus"
                ? "text-accent dark:text-accent-dark"
                : "text-dark dark:text-light"
            } font-semibold text-[32px] tracking-tight`}
          >
            Course status
          </button>
          <div className="h-[80px] w-[2px] bg-gray-400"></div>
          <button
            onClick={() => setCurrentView("Reviews")}
            className={`hover:bg-accent hover:text-light hover:shadow-lg hover:shadow-black/40 active:bg-primary rounded-lg p-[24px] ${
              currentView === "Reviews"
                ? "text-accent dark:text-accent-dark"
                : "text-dark dark:text-light"
            } font-semibold text-[32px] tracking-tight`}
          >
            Reviews
          </button>
        </div>
        {currentView === "Enrollments" && <Enrollments data={usersData} />}

        {currentView === "CourseStatus" && <Status data={statistics} />}

        {currentView === "Reviews" && <Reviews data={course.reviews} />}
      </div>
    </main>
  );
};

export default CourseInfo;
