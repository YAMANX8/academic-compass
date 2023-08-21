import React from "react";
import { FaRegMap as Map } from "react-icons/fa";
import Hero from "../assets/images/hero.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RoadmapCard } from "../components/index.js";

function Home() {
  // style variables
  const heading = "text-[3rem] font-semibold tracking-tight leading-[125%]";
  const text = "";
  const status =
    "flex flex-col gap-4 items-center text-[32px] tracking-tight leading-[125%]";
  // states
  const [enrollments, setEnrollments] = useState(0);
  const [roadmaps, setRoadmaps] = useState(0);
  const [courses, setCourses] = useState(0);
  const [instructors, setInstructors] = useState(0);
  const [roadCards, setRoadCards] = useState([
    { id: 1, title: "frontend", description: "kjsifjoweifjowij" },
    { id: 2, title: "backend", description: "kjsifjoweifjowij" },
    {
      id: 3,
      title: "artificial intelligence",
      description: "kjsifjoweifjowij",
    },
  ]);
  console.log(roadCards);
  return (
    <>
      <section className="w-full bg-light mt-[100px] px-[120px] py-[48px] flex gap-4 justify-between items-center">
        {/* ************************************************************ */}
        <div className="flex flex-col gap-5 items-start">
          <h1 className={`${heading} w-[488px]`}>
            <span className="text-primary ">A Roadmap-Driven</span> Online
            Education Platform
          </h1>

          <p className="text-[32px] font-medium leading-[125%] w-[488px]">
            Unlocking Knowledge and Success Through Guided Learning Paths
          </p>
          {/* w-[262px] h-[44px]  bg-primary text-2xl ml-[120px] p-[6px] mr-[256px] mb-[207px] mt-[1px] font-medium items-center */}
          <Link
            to="/roadmaps"
            className="flex gap-[10px] items-center font-semibold px-[20px] py-[10px] bg-primary text-light rounded-[5px]"
          >
            <Map className="text-[25px]" />
            Explore Our Roadmaps
          </Link>
        </div>

        {/* ******************************************************** */}
        <div className="w-[696px] h-[696px] ">
          <img src={Hero} />
        </div>
      </section>

      {/* status section */}
      <section className="px-[120px] py-[27px] flex justify-between w-full bg-black text-light">
        <div className={`${status}`}>
          <span>{enrollments}</span>
          <p>Enrollments</p>
        </div>
        <div className={`${status}`}>
          <span>{roadmaps}</span>
          <p>Roadmaps</p>
        </div>
        <div className={`${status}`}>
          <span>{courses}</span>
          <p>Courses</p>
        </div>
        <div className={`${status}`}>
          <span>{instructors}</span>
          <p>Instructors</p>
        </div>
      </section>

      {/* popular roadmaps section */}
      <section className="py-[48px] px-[120px] bg-light">
        <h2 className="text-[48px] font-semibold leading-[125%] tracking-tight">
          Popular Roadmaps
        </h2>
        <div className="flex flex-col">
          {roadCards.map((card) => (
            <RoadmapCard
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
