import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
  BsCameraVideo as Video,
  BsQuestionCircle as Quiz,
  BsBook as Articles,
  BsChevronUp as ChevronUp,
  BsChevronDown as ChevronDown,
} from "react-icons/bs";

import Card from "../assets/images/Rectangle 63.png";
import Profile from "../assets/images/Ellipse 6 (1).png";

function CourseView() {
  const firstName = "Ahmad";
  const lastName = "omer";
  const images = { Profile };
  
const [isUp , setIsUp] =useState(true);
const [isUp2, setIsUp2] = useState(true)
const [isUp3, setIsUp3] = useState(true)
const [isUp4, setIsUp4] = useState(true)
const [isUp5, setIsUp5] = useState(true)
const [isUp6, setIsUp6] = useState(true)


  const [expandedStates, setExpandedStates] = useState({});

  const toggleReviewExpanded = (index) => {
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const reviews = [
    {
      fname: "ahmad",
      lname: "omer",
      images: Profile,
      stars: 4.5,
      descripationReviews: `The course contains a lot of useful information, and if you are
    just starting out in the world of programming, I would
     recommend this course. The only criticism is that it has
      become quite outdated, and many things have changed, so 
      recommend this course. The only criticism is that it has
      recommend this course. The only criticism is that it has`,
      data: "12/12/2023",
    },
    {
      fname: "yaman",
      lname: "doe",
      image: Card,
      stars: 4.5,
      descripationReviews: `The course contains a lot of useful information, and if you are
    just starting out in the world of programming, I would
     recommend this course. The only criticism is that it has
      become quite outdated, and many things have changed, so 
      recommend this course. The only criticism is that it has
      recommend this course. The only criticism is that it has`,
      data: "12/12/2023",
    },
    {
      fname: "jone",
      lname: "emsl",
      image: Card,
      stars: 4.5,
      descripationReviews: `The course contains a lot of useful information, and if you are
    just starting out in the world of programming, I would
     recommend this course. The only criticism is that it has
      become quite outdated, and many things have changed, so 
      recommend this course. The only criticism is that it has
      recommend this course. The only criticism is that it has`,
      data: "12/12/2023",
    },
    {
      fname: "zana",
      lname: "omer",
      image: Card,
      stars: 4.5,
      descripationReviews: 
      `The course contains a lot of useful information, and if you are
      just starting out in the world of programming, I would
     recommend this course. The only criticism is that it has
      become quite outdated, and many things have changed, so 
    
      `,
      data: "12/12/2023",
    },
  ];

  const [course, setCourse] = useState({
    image: Card,
    title: "Learn Api basics, and learn how to integrate with the backend",
    subtitle:
      "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
    stars: 4.5,
    ratings: 1000,
    duration: 10,
    itemsCount: 75,
    level: "beginres",
    instructor: "Jone Doe",
    videoCount: 25,
    quizCount: 25,
    articleCount: 25,
    data: "12/12/2023",
    articles: 25,
    topic1: "Topic level 1",
    topic2: "Topic level 2",
    topic3: "Topic level 3",
    descripation: `60%+ of people who try to learn how to program end up quitting.
      <br> <br>
        Why?
        <br> <br>
        Is it because "programming just isn't for everyone"?
        <br> <br>
        Or is it because only those with experience in hard sciences can learn it?
        <br> <br>
      <strong>  No, neither of those are true. </strong> It's simply due to the fact that the vast majority of people who try don't have a basic understanding of the technology they're going to use.
        <br> <br>
        How exactly can you tackle responsive design if you don't know how a browser works?
        <br> <br>
        How are you going to create a desktop application if you don't know what makes your computer freeze constantly (besides porn, obviously)?
        <br> <br>
        How are you going to hide your confused facial expression the next time your site's server crashes because of a "node socket problem" in your full stack Javascript?
        <br> <br>
        If you've ever taken your computer to a technician and said "Make it work" or "It don't work good. Me cry" then you're exactly who needs this course.
        <br> <br>
        Over the next 10 years the United States is expected to add over 2 million programming jobs. Jobs that pay well over $100,000 a year. And that's just the United States (Merica').
        <br> <br>
        So if you're trying to jump on the coding gravy train, put down your bronze statuette of Elon Musk standing on Mars, and start filling in the gaps in your "tech literacy". Even if you yourself do not become a "coding ninja" yourself all the future coding ninjas you work with with thank you (and tell you to stop calling them coding ninjas).`,

    learn: [
      "Work with one of the most in-demand web development programming languages",
      "Build modern, fast and scalable server-side web applications with NodeJS, databases like SQL or MongoDB and more",
      "Get a thorough introduction to DenoJS",
      "Learn the basics as well as advanced concepts of NodeJS in great detail",
      "Understand the NodeJS ecosystem and build server-side rendered apps, REST APIs and GraphQL APIs",
    ],

    forWho: [
      "Beginner or advanced web developers who want to dive into backend (server-side) development with NodeJS",
      "Everyone who's interested in building modern, scalable and high-performing web applications",
      "Experienced NodeJS developers who want to dive into specific features like using GraphQL with NodeJS",
      "Anyone interested in learning how to program that is already struggling or intimidated by the process",
    ],
    Requirements: [
      "General knowledge of how the web works is recommended but not a must-have",
      "Basic JavaScript knowledge is strongly recommended but could be picked up whilst going through the course",
      "NO NodeJS knowledge is required!",
      "Access to the internet",
    ],
  });

  const descriptionArray = course.descripation.split("<br> <br>");
  return (
    <section className="px-[120px]">
      <div className="  bg-secondary w-[1200px] mt-[-100px] pt-[100px] shadow-[1000px_0_0_0,-1000px_0_0_0] dark:shadow-secondary-dark shadow-secondary ">
        <div className="flex gap-[32px]   ">
          <div>
            <img className="w-[400px] " src={course.image} />
          </div>
          <div>
            <h1 className="font-bold mt-[-10px] text-[32px] w-[768px] tracking-tight">
              {course.title}
            </h1>
            <p className=" text-[24px] w-[768px]  leading-l tracking-tight ">
              {course.subtitle}
            </p>
            <div className="flex gap-[5px] py-[16px] ">
              {[...Array(Math.floor(course.stars))].map((_, starIndex) => (
                <Full key={starIndex} className="text-yellow-500 text-[24px]" />
              ))}
              {course.stars % 1 !== 0 && (
                <Half className="text-yellow-500 text-[24px]" />
              )}
              {[...Array(5 - Math.ceil(course.stars))].map((_, starIndex) => (
                <Star key={starIndex} className="text-yellow-500 text-[24px]" />
              ))}
              <span className="ml-[10px] text-xl">{course.stars}</span>
              <span className="ml-[10px]">({course.ratings} ratings)</span>
            </div>
            <div className="text-accent-dark flex justify-between  ">
              <span>
                duration {course.duration} hr • {course.itemsCount} items • for{" "}
                {course.level}
              </span>
              <label>Created By: {course.instructor}</label>
            </div>
          </div>
        </div>

        <div className="py-[41px] flex justify-between">
          <div className=" flex items-center gap-8">
            <span className="teaxt-[20px] font-semibold  tracking-tight">
              {" "}
              This course contain:
            </span>

            <div className=" flex items-center gap-4">
              <Video />
              {course.videoCount} Videos
            </div>
            <div className=" flex items-center gap-4">
              <Quiz />
              {course.quizCount} Quiz
            </div>
            <div className=" flex items-center gap-4">
              <Articles />
              {course.articles} Articles
            </div>
          </div>
          <Link className=" flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
            {" "}
            Enroll in This Course
          </Link>
        </div>
      </div>

      {/* In this course you will learn the following */}
      <div className="py-8 ">
        <h1 className="py-4  font-bold text-[32px] tracking-tight">
          In this course you will learn the following
        </h1>
        <ul>
          {course.learn.map((item, index) => (
            <li
              key={index}
              className="text-gray-700 mb-2 text-[20px] tracking-tight"
            >
              <span className="text-black pr-2 text-xl">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Description */}
      <div className="py-8">
        <h1 className="py-4 font-bold text-[32px] tracking-tight">
          Description
        </h1>
        <ul>
          {descriptionArray.map((item, index) => (
            <li
              key={index}
              className="text-gray-700 mb-8 text-[20px] tracking-tight"
            >
              {item.includes("<strong>") ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.replace(
                      "<strong>",
                      '<strong class="font-bold text-dark text-lg">'
                    ),
                  }}
                />
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="py-8 ">
        <h1 className="py-4  font-bold text-[32px] tracking-tight">
          Requirements
        </h1>
        <ul>
          {course.Requirements.map((item, index) => (
            <li
              key={index}
              className="text-gray-700 mb-2 text-[20px] tracking-tight"
            >
              <span className="text-black pr-2 text-xl">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Course Content */}
      <div className="py-8  ">
        <h1 className="py-8  font-bold text-[32px] tracking-tight ">
          {" "}
          Course Content
        </h1>

        <div className=" border-gray-50  ">
          <details className="border  border-gray-500  text-light text-[20px] tracking-tight   ">
            <summary className="px-[16px] py-[13px] flex justify-between font-medium items-center bg-primary">
              {" "}
              {course.topic1}
              <span onClick={() => setIsUp2(!isUp)} className="text-3xl toggle-icon cursor-pointer ">
              {isUp ?  <ChevronUp/> : <ChevronDown /> }
              </span>
            </summary>
            <p className="text-dark">
              <details className="border   border-gray-500  text-dark text-[20px] tracking-tight">
                <summary className="px-[16px] py-[13px] flex justify-between font-medium items-center bg-secondary  ">
                  {course.topic2}
                  <span onClick={() => setIsUp2(!isUp2)} className="text-3xl cursor-pointer">
                    {isUp2 ?  <ChevronUp/> : <ChevronDown /> }
                  </span>
                </summary>
                <p>
                  <ul className="border-l-2 border-r-2 border-gray-500 text-accent">
                    <li className="flex items-center gap-4 p-[16px] ">
                      <Video />
                      {course.videoCount} Videos
                    </li>
                    <li className="flex items-center gap-4 p-[16px]">
                      <Quiz />
                      {course.quizCount} Quiz
                    </li>
                    <li className="flex items-center gap-4 p-[16px]">
                      <Articles />
                      {course.articles} Articles
                    </li>
                  </ul>{" "}
                </p>
              </details>
            </p>
          </details>

          <details className="border border-gray-500 font-medium text-dark text-[20px] tracking-tight">
            <summary className="px-[16px] py-[13px] flex justify-between items-center bg-secondary  ">
              {course.topic3}
              <span onClick={() => setIsUp3(!isUp3)}  className="text-3xl cursor-pointer">
              {isUp3 ?  <ChevronUp/> : <ChevronDown /> }
              </span>
            </summary>
          </details>

          <details className="border border-gray-500 font-medium text-dark text-[20px] tracking-tight">
            <summary className="px-[16px] py-[13px] flex justify-between items-center bg-secondary ">
              {course.topic2}
              <span onClick={()=> setIsUp4(!isUp4)} className="text-3xl cursor-pointer">
              {isUp4 ?  <ChevronUp/> : <ChevronDown /> }
              </span>
            </summary>
          </details>

          <details className="border border-gray-500 font-medium text-light text-[20px] tracking-tight">
            <summary className="px-[16px] py-[13px] flex justify-between items-center bg-primary  ">
              {course.topic1}
              <span  onClick={()=> setIsUp5(!isUp5)}  className="text-3xl cursor-pointer">
              {isUp5 ?  <ChevronUp/> : <ChevronDown /> }
              </span>
            </summary>
          </details>

          <details className="border border-gray-500 font-medium text-light text-[20px] tracking-tight">
            <summary className="px-[16px] py-[13px] flex justify-between items-center bg-primary  ">
              {course.topic1}
              <span onClick={()=> setIsUp6(!isUp6)} className="text-3xl cursor-pointer">
              {isUp6 ?  <ChevronUp/> : <ChevronDown /> }
              </span>
            </summary>
          </details>
        </div>
      </div>

      {/* Reviews */}
      <div>
      <h1 className="py-8 font-bold text-[32px] tracking-tight">Reviews</h1>
      <div className="grid grid-cols-2 gap-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-[16px] border-gray-500 shadow-lg">
            <div className="flex gap-4">
              <img src={Profile} alt="Profile" />
              <div>
                <span className="tracking-tight">
                  {review.fname} {review.lname}
                </span>
                <div className="flex gap-[5px] items-center">
                  {[...Array(Math.floor(review.stars))].map((_, starIndex) => (
                    <Full key={starIndex} className="text-yellow-500" />
                  ))}
                  {review.stars % 1 !== 0 && (
                    <Half className="text-yellow-500" />
                  )}
                  {[...Array(5 - Math.ceil(review.stars))].map((_, starIndex) => (
                    <Star key={starIndex} className="text-yellow-500" />
                  ))}
                  <span className="ml-[10px] text-accent-dark">
                    {review.stars}
                  </span>
                  <span className="ml-[10px] text-accent-dark">
                    {review.data}
                  </span>
                </div>
              </div>
            </div>
            <div className={`relative ${expandedStates[index] ? "" : "line-clamp-4"}`}>
              <p className="w-[460px] py-[30px]">
                {review.descripationReviews}
              </p>
              {review.descripationReviews.length > 300 && !expandedStates[index] && (
                 <div className="absolute bottom-2 right-2 mx-[90px]  px-2">. . . . .</div>
              )}
            </div>
            {review.descripationReviews.length > 300 ? (
              <div className="py-8">
                <button
                  onClick={() => toggleReviewExpanded(index)}
                  className="px-[20px] py-[10px] rounded-[5px] tracking-tight text-primary font-semibold border border-accent"
                >
                  {expandedStates[index] ? "show less" : "show more"}
                </button>
              </div>
            ) : null}
          </div>
        ))}
        </div>
        <div className="flex justify-center items-center mt-[16px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
          <button>Load more reviews</button>
        </div>
      </div>
    </section>
  );
}

export default CourseView;
