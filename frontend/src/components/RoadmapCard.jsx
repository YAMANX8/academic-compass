import React from "react";
import { Link } from "react-router-dom";
import Img from "../assets/images/frontend.svg";
import { AiOutlineEnter as Enter } from "react-icons/ai";

const RoadmapCard = ({ title, order, description, img }) => {
  return (
    <div
      className={`flex justify-between w-full bg-secondary rounded-[10px] py-4 px-5 gap-5 ${
        order % 2 != 0 ? "flex-row-reverse" : "flex-row"
      }  shadow-[0_5px_15px] shadow-dark/50`}
    >
      <img src={img} className="block w-[345px]" />

      <div className="flex flex-col items-start gap-4 justify-between">
        <h3 className="text-[48px] font-bold leading-[125%] tracking-tight text-accent mb-4">
          {title}
        </h3>
        <p className="text-[28px] leading-[125%] tracking-tight">
          {description}
        </p>
        <Link
          to="/roadmaps"
          className="flex items-center self-center bg-primary text-light py-[10px] px-[20px] rounded-[5px] font-semibold gap-[10px]"
        >
          Discover <Enter />
        </Link>
      </div>
    </div>
  );
};

export default RoadmapCard;
