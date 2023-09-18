import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BsStarHalf as Half,
  BsFillStarFill as Full,
  BsStar as Star,
  BsChevronUp as ChevronUp,
  BsChevronDown as ChevronDown,
} from "react-icons/bs";
import Card from "../assets/images/Rectangle 63.png";
import axios from "../apis/axios";

//ratings list
const ratingsList = ["4.5", "4.0", "3.5", "3.0"];

const SearchStudent = () => {
  //getting the search text
  const { text } = useParams();
  const [results, setResults] = useState({
    total_courses: 4,
    data: [
      {
        id: 1,
        roadmap: "Frontend",
        coursesCount: 12,
        courses: [
          {
            id: 1,
            title:
              "Learn Api basics, and learn how to integrate with the backend",
            subtitle:
              "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
            ratings: 4.5,
            duration: 60,
            itemsCount: 75,
            level: "beginers",
            instructor: "jone doe",
            topics: [
              "HTML",
              "CSS",
              "JavaScript",
              "FetchApi",
              "JSON",
              "DOM Manipulation",
            ],
            thumnail: Card,
          },
          {
            id: 2,
            title:
              "Learn Api basics, and learn how to integrate with the backend",
            subtitle:
              "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
            ratings: 4.5,
            duration: 60,
            itemsCount: 75,
            level: "beginers",
            instructor: "jone doe",
            topics: [
              "HTML",
              "CSS",
              "JavaScript",
              "FetchApi",
              "JSON",
              "DOM Manipulation",
            ],
            thumnail: Card,
          },
          {
            id: 3,
            title:
              "Learn Api basics, and learn how to integrate with the backend",
            subtitle:
              "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
            ratings: 4.5,
            duration: 60,
            itemsCount: 75,
            level: "beginers",
            instructor: "jone doe",
            topics: [
              "HTML",
              "CSS",
              "JavaScript",
              "FetchApi",
              "JSON",
              "DOM Manipulation",
            ],
            thumnail: Card,
          },
          {
            id: 4,
            title:
              "Learn Api basics, and learn how to integrate with the backend",
            subtitle:
              "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",
            ratings: 4.5,
            duration: 60,
            itemsCount: 75,
            level: "beginers",
            instructor: "jone doe",
            topics: [
              "HTML",
              "CSS",
              "JavaScript",
              "FetchApi",
              "JSON",
              "DOM Manipulation",
            ],
            thumnail: Card,
          },
        ],
      },
      {
        id: 2,
        roadmap: "Backend",
        coursesCount: 1,
        courses: [
          {
            id: 1,
            title: "Node.js - The Complete RESTful API Masterclass (2023)",
            subtitle:
              "Node.js : Build fast, scalable and powerful Nodejs RESTful APIs using Express & MongoDB from Development to Deployment.",
            ratings: 4.5,
            duration: 60,
            itemsCount: 75,
            level: "experts",
            instructor: "jone doe",
            topics: [
              "REST API",
              "Node JS",
              "JavaScript",
              "FetchApi",
              "Express JS",
              "MongoDB",
            ],
            thumnail: Card,
          },
        ],
      },
    ],
  });
  //controling the state of the details tags
  const [isOpen, setIsOpen] = useState(Array(results.data.length).fill(true)); //لك اللّاوي الشغل لك وليييييي
  const toggleDetails = async (index) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index] = !updatedIsOpen[index];
    setIsOpen(updatedIsOpen);
  };
  const [formData, setFormData] = useState({
    Beginner: "",
    Intermediate: "",
    Expert: "",
    Project: "",
    Challenge: "",
    Observational: "",
    rating: "0",
  });
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? (checked ? value : "") : value,
      };
    });
  }

  //call the api
  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(
          "/search/course",
          JSON.stringify({
            Beginner: formData.Beginner,
            Intermediate: formData.Intermediate,
            Expert: formData.Expert,
            Rating: formData.rating,
            typeName1: formData.Project,
            typeName2: formData.Challenge,
            typeName3: formData.Observational,
            courseTitle: text,
            courseRank: 1,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(response.data.data)
        setResults(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    postData();
  }, [formData]);

  return (
    <section className="w-[1200px]">
      <h1 className="font-semibold text-[48px] tracking-tight p-[16px]">
        {results.total_courses} Result for “{text}”
      </h1>
      <div className="flex">
        <div className="flex flex-col gap-4 p-4 min-w-[282px] bg-secondary dark:bg-secondary-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back min-h-screen">
          <div>
            <h2 className="text-[32px] font-semibold tracking-tight">
              By Level
            </h2>
            <div className="flex gap-[10px] py-[16px]">
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  id="Beginner"
                  name="Beginner"
                  className=" w-full h-full cursor-pointer"
                  checked={formData.Beginner}
                  value="Beginner"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="Beginner">Beginner</label>
            </div>
            <div className="flex gap-[10px] py-[16px]">
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  id="Intermediate"
                  name="Intermediate"
                  className=" w-full h-full cursor-pointer"
                  checked={formData.Intermediate}
                  value="Intermediate"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="Intermediate">Intermediate</label>
            </div>
            <div className="flex gap-[10px] py-[16px]">
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  id="Expert"
                  name="Expert"
                  className=" w-full h-full cursor-pointer"
                  checked={formData.Expert}
                  value="Expert"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="Expert">Expert</label>
            </div>
          </div>
          <div>
            <h2 className="text-[32px] font-semibold tracking-tight">
              By Type
            </h2>
            <div className="flex gap-[10px] py-[16px]">
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  id="Project"
                  name="Project"
                  className=" w-full h-full cursor-pointer"
                  checked={formData.Project}
                  value="Project"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="Project">Project Based</label>
            </div>
            <div className="flex gap-[10px] py-[16px]">
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  id="Challenge"
                  name="Challenge"
                  className=" w-full h-full cursor-pointer"
                  checked={formData.Challenge}
                  value="Challenge"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="Challenge">Challenge Based</label>
            </div>
            <div className="flex gap-[10px] py-[16px]">
              <div className="w-6 h-6 flex items-center justify-center">
                <input
                  id="Observational"
                  name="Observational"
                  className=" w-full h-full cursor-pointer"
                  checked={formData.Observational}
                  value="Observational"
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="Observational">Observational Based</label>
            </div>
          </div>
          {/*  */}
          <div>
            <h2 className="text-[32px] font-semibold tracking-tight">
              {" "}
              Ratings
            </h2>
            <div className="pb-[16px]">
              {ratingsList.map((item, index) => (
                <div className="flex gap-[10px] py-[16px]" key={index}>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <input
                      className="w-full h-full cursor-pointer"
                      type="radio"
                      id={item}
                      name="rating"
                      value={item}
                      checked={formData.rating === item}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor={item} className="flex gap-[5px]">
                    {[...Array(Math.floor(item))].map((_, starIndex) => (
                      <Full
                        key={starIndex}
                        className="text-yellow-500 text-[24px]"
                      />
                    ))}
                    {item % 1 !== 0 && (
                      <Half className="text-yellow-500 text-[24px]" />
                    )}
                    {[...Array(5 - Math.ceil(item))].map(
                      (_, emptyStarIndex) => (
                        <Star
                          key={emptyStarIndex}
                          className="text-yellow-500 text-[24px]"
                        />
                      )
                    )}
                    <span className="ml-[10px] text-xl">{item} & up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {results.data.map((result, index) => (
            <details
              key={result.id}
              className="bg-primary text-light cursor-pointer"
              open={true}
            >
              <summary
                className="flex justify-between py-[13px] px-4 font-medium text-[28px] tracking-tight items-center"
                onClick={() => toggleDetails(index)}
              >
                {result.roadmap}{" "}
                {isOpen[index] ? <ChevronUp /> : <ChevronDown />}
              </summary>
              <div
                className={`bg-light dark:bg-dark flex flex-col gap-4 transition-all duration-1000 ease-in-out-back`}
              >
                {result.courses.map((course) => (
                  <Link
                    to={`/student/courseview/${course.id}`}
                    key={course.id}
                    className="py-8 px-4 shadow-[5px_5px_5px_0] bg-light dark:bg-dark shadow-black/20 hover:scale-[1.02] [transition:background-color_1s_cubic-bezier(0.780,-0.375,0.260,1.320),transform_.3s_cubic-bezier(0.780,-0.375,0.260,1.320)]"
                  >
                    <CourseCard
                      title={course.title}
                      subtitle={course.subtitle}
                      ratings={course.ratings}
                      duration={course.duration}
                      itemsCount={course.itemsCount}
                      level={course.level}
                      instructor={course.instructor}
                      topics={course.topics}
                      thumnail={course.thumnail}
                    />
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchStudent;

// course card component
const CourseCard = ({
  title,
  subtitle,
  ratings,
  duration,
  itemsCount,
  level,
  instructor,
  topics,
  thumnail,
}) => {
  return (
    <>
      <div className="flex">
        <div className="flex min-w-[260px] max-w-[260px] aspect-video">
          <img
            src={thumnail}
            alt="course thumnail"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2 ml-4 text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
          <h2 className="font-bold text-[20px] tracking-tight">{title}</h2>
          <p className="text-[20px] tracking-tight leading-l">{subtitle}</p>
          <div className="flex gap-2">
            <div className="flex gap-[5px]">
              {[...Array(Math.floor(ratings))].map((_, index) => (
                <Full key={index} className="text-yellow-500 text-[24px]" />
              ))}
              {ratings % 1 !== 0 && (
                <Half className="text-yellow-500 text-[24px]" />
              )}
              {[...Array(5 - Math.ceil(ratings))].map((_, index) => (
                <Star key={index} className="text-yellow-500 text-[24px]" />
              ))}
            </div>{" "}
            {ratings}
          </div>
          <div className="text-accent/70 dark:text-accent-dark/70 flex justify-between transition-all duration-1000 ease-in-out-back">
            <div>{`duration: ${duration} min • ${itemsCount} items • for ${level}`}</div>
            <cite>instructor: {instructor}</cite>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8 mt-8 text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
        <p className="font-bold">Topics covered by this course:</p>
        <div className="flex-1 flex gap-4 overflow-auto">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="p-[10px] bg-secondary dark:bg-secondary-dark text-dark dark:text-light rounded-full transition-all duration-1000 ease-in-out-back"
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
