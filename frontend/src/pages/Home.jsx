import React from "react";
import { FaRegMap as Map } from "react-icons/fa";
import Hero from "../assets/images/hero.svg";
import { Link } from "react-router-dom";

function Home() {
  const heading = "text-[3rem] font-semibold tracking-tight leading-[125%]";
  const text = "";
  return (
    <div className="w-full bg-light mt-[100px] px-[120px] py-[48px] flex gap-4 justify-between items-center">
      {/* ************************************************************ */}
      <div className="flex flex-col gap-5 items-start">
        <h1 className={`${heading} w-[488px]`}>
          <span className="text-primary ">A Roadmap-Driven</span> Online Education Platform
        </h1>

        <p className="text-[32px] font-medium leading-[125%] w-[488px]">
          Unlocking Knowledge and Success Through Guided Learning Paths
        </p>
        {/* w-[262px] h-[44px]  bg-primary text-2xl ml-[120px] p-[6px] mr-[256px] mb-[207px] mt-[1px] font-medium items-center */}
        <Link to="/roadmaps" className="flex gap-[10px] items-center font-semibold px-[20px] py-[10px] bg-primary text-light rounded-[5px]">
          <Map className="text-[25px]"/>
          Explore Our Roadmaps
        </Link>
      </div>

      {/* ******************************************************** */}
      <div className="w-[696px] h-[696px] ">
        <img src={Hero} />
      </div>
    </div>
  );
}

export default Home;
