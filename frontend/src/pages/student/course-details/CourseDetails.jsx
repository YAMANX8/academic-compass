import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
  BsCameraVideo as Video,
  BsQuestionCircle as Quiz,
  BsBook as Articles,
} from "react-icons/bs";
import { useGetCourseDetails, usePostEnroll } from "../../../apis/course";
import { paths } from "../../../routes/paths";
import Card from "src/assets/images/Rectangle 63.png";
import Profile from "src/assets/images/profile.png";

import {
  CourseContent,
  ReviewCards,
  ReviewForm,
  Modal,
  Button,
} from "../../../components";
import axios from "src/apis/axios";
import { useAuthContext } from "src/auth/hooks";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const SectionWrapper = ({ title, children }) => {
  return (
    <article className="flex flex-col gap-4 py-8">
      <h2 className="text-[32px] font-bold tracking-tight">{title}</h2>
      <div>{children}</div>
    </article>
  );
};

const CourseDetails = () => {
  const getCourseDetails = useGetCourseDetails();
  const postEnroll = usePostEnroll();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const [course, setCourse] = useState({
    course_thumnail: Card,
    course_title:
      "Learn Api basics, and learn how to integrate with the backend",
    subtitle:
      "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
    stars: 4.5,
    ratingCount: 1000,
    courseDuration: 10,
    itemsCount: 75,
    levelName: "beginres",
    instructor: "Jone Doe",
    video_count: 25,
    quiz_count: 25,
    article_count: 25,
    data: "12/12/2023",
    articles: 25,
    course_description: `60%+ of people who try to learn how to program end up quitting.
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
    requirements: [
      "General knowledge of how the web works is recommended but not a must-have",
      "Basic JavaScript knowledge is strongly recommended but could be picked up whilst going through the course",
      "NO NodeJS knowledge is required!",
      "Access to the internet",
    ],
    courseContent: [
      {
        id: 1,
        topicTitle: "Topic level 1",
        subTopics: [
          {
            id: 1,
            title: "webpack",
            items: [
              {
                id: 1,
                title: "video intro",
                order: 1,
                type: "video",
              },
              {
                id: 2,
                title: "An Article",
                order: 2,
                type: "article",
              },
              {
                id: 3,
                title: "An Quiz",
                order: 3,
                type: "quiz",
              },
            ],
          },
          {
            id: 2,
            title: "Topic level N",
            items: [
              {
                id: 1,
                title: "A Lecture",
                order: 1,
                type: "video",
              },
              {
                id: 2,
                title: "An Article",
                order: 2,
                type: "article",
              },
              {
                id: 3,
                title: "A Quiz",
                order: 3,
                type: "quiz",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        topicTitle: "Topic level 1",
        subTopics: [
          {
            id: 1,
            title: "Topic level N",
            items: [
              {
                id: 4,
                title: "A Lecture",
                order: 4,
                type: "video",
              },
              {
                id: 5,
                title: "An Article",
                order: 5,
                type: "article",
              },
              {
                id: 6,
                title: "A Quiz",
                order: 6,
                type: "quiz",
              },
            ],
          },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        fname: "Ahmed",
        lname: "Omer",
        images: Profile,
        stars: 4.5,
        comment: `The course contains a lot of useful information, and if you are
      just starting out in the world of programming, I would
       recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so 
        recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has`,
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
      soso soso soso soso sosososo soso soso soso sosososo soso
       soso soso sosososo soso soso soso sosososo soso soso soso soso
       soso soso sosososo soso soso soso sosososo soso soso soso soso
       soso soso sosososo soso soso soso sosososo soso soso soso soso`,
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
       momo momo momo momo momomomo momo momo momo momomomo momo
       momo momo momomomo momo momo momo momomomo momo momo momo momo`,
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
       recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so 
        `,
        data: "12/12/2023",
        img: Profile,
      },
    ],
  });
  // for the modal
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const descriptionArray = course.course_description.split("<br> <br>");
  useEffect(() => {
    const getCourse = async () => {
      try {
        const res = await getCourseDetails(id);
        setCourse(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, []);
  const handleEnroll = async () => {
    try {
      const res = await postEnroll(id);
      toast.success("You enrolled successfully!");
      navigate(paths.student.root);
    } catch (error) {
      if (error.response?.status === 401)
        toast.error(error.response.data.message);
      else {
        // navigate("/student/login", { state: { from: location } });
        toast.error("Authentication Required!");
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Academic Compass: {course.course_title}</title>
      </Helmet>
      <section className="w-[1200px]">
        <div className="  bg-secondary text-dark  shadow-[0px_-1000px_0px_1000px] shadow-secondary duration-1000 ease-in-out-back dark:bg-secondary-dark dark:text-light dark:shadow-secondary-dark">
          <div className="flex gap-[32px]">
            <div className="flex aspect-video min-w-[400px]">
              <img className="object-contain" src={course.course_thumnail} />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <h1 className="text-[32px] font-bold leading-[39px] tracking-tight">
                {course.course_title}
              </h1>
              <p className="text-[24px] leading-l tracking-tight">
                {course.subtitle}
              </p>
              <div className="flex gap-2">
                <div className="flex gap-[5px]">
                  {[...Array(Math.floor(course.stars))].map((_, starIndex) => (
                    <Full
                      key={starIndex}
                      className="text-[24px] text-yellow-500"
                    />
                  ))}
                  {course.stars % 1 !== 0 && (
                    <Half className="text-[24px] text-yellow-500" />
                  )}
                  {[...Array(5 - Math.ceil(course.stars))].map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="text-[24px] text-yellow-500"
                      />
                    ),
                  )}
                </div>
                <span>{course.stars}</span>
                <span>{`(${course.ratingCount} ratings)`}</span>
              </div>

              <div className="flex justify-between text-accent duration-1000 ease-in-out-back dark:text-accent-dark">
                <span>
                  duration {course.courseDuration} hr • {course.itemsCount}{" "}
                  items • for {course.levelName}
                </span>
                <cite>Created By: {course.instructor}</cite>
              </div>
            </div>
          </div>

          <div className="flex justify-between py-8">
            <div className=" flex items-center gap-8">
              <span className="text-[20px] font-semibold tracking-tight">
                This course contain:
              </span>

              <div className=" flex items-center gap-4">
                <Video />
                {course.video_count} Videos
              </div>
              <div className=" flex items-center gap-4">
                <Quiz />
                {course.quiz_count} Quiz
              </div>
              <div className=" flex items-center gap-4">
                <Articles />
                {course.article_count} Articles
              </div>
            </div>
            {!course?.is_enrolled ? (
              <Button size="lg" onClick={handleEnroll}>
                Enroll in This Course
              </Button>
            ) : (
              <Button
                color="accent"
                size="lg"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Review this course
              </Button>
            )}
          </div>
        </div>

        {/* In this course you will learn the following */}
        <SectionWrapper title="In this course you will learn the following:">
          <ul className="flex flex-col gap-2 text-[20px] tracking-tight">
            {course.learn.map((item, index) => (
              <li key={index}>
                <span className="m-3 text-[25px]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* Description */}
        <SectionWrapper title="Description">
          <ul>
            {descriptionArray.map((item, index) => (
              <li key={index} className=" mb-8 text-[20px] tracking-tight">
                {item.includes("<strong>") ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace(
                        "<strong>",
                        '<strong class="font-bold text-lg">',
                      ),
                    }}
                  />
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* Who this course is for: */}
        <SectionWrapper title="Who this course is for:">
          <ul className="flex flex-col gap-2 text-[20px] tracking-tight">
            {course.forWho.map((item, index) => (
              <li key={index}>
                <span className="m-3 text-[25px]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* Requirements */}
        <SectionWrapper title="Requirements">
          <ul className="flex flex-col gap-2 text-[20px] tracking-tight">
            {course.requirements.map((item, index) => (
              <li key={index}>
                <span className="m-3 text-[25px]">•</span>
                {item}
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* Course Content */}
        <SectionWrapper title="Course Content">
          {/* <CourseContent courseContent={course.courseContent} /> */}
        </SectionWrapper>

        {/* Reviews */}
        <SectionWrapper title="Reviews">
          <ReviewCards reviews={course.reviews} />

          <Button className="mt-4 w-full">Load more reviews</Button>
        </SectionWrapper>
        <Modal
          isOpen={isOpen}
          content={<ReviewForm setIsOpen={setIsOpen} />}
          title={`Leave a review:`}
          close={() => setIsOpen(false)}
        />
      </section>
    </>
  );
};

export default CourseDetails;
