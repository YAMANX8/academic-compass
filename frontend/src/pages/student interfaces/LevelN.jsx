//here we use topic level n to get the data
import { useState } from "react";
import {
  RightLine,
  LeftLine,
  StartLine,
  EndLineRight,
  EndLineLeft,
} from "../../components";
import { Link, useParams } from "react-router-dom";

const LevelN = () => {
  const { roadmaptitle, topicl1 } = useParams();
  const [levelN, setLevelN] = useState([
    {
      id: 1,
      topicTitle: "topic title",
      topicDescription: "desc goes here",
      topicOrder: 1,
      topicStatus: "Trending",
      isItLast: true,
    },
    {
      id: 2,
      topicTitle: "topic title",
      topicDescription: "desc goes here",
      topicOrder: 2,
      topicStatus: "Stable",
      isItLast: true,
    },
    {
      id: 3,
      topicTitle: "topic title",
      topicDescription: "desc goes here",
      topicOrder: 3,
      topicStatus: "Stable",
      isItLast: true,
    },
    {
      id: 4,
      topicTitle: "topic title",
      topicDescription: "desc goes here",
      topicOrder: 3,
      topicStatus: "deprecated",
      isItLast: true,
    },
  ]);
  return (
    <>
      <StartLine />
      <div className="flex justify-between w-full flex-row-reverse px-[100px] tracking-tight font-semibold">
        <Link
          to={`/student/roadmaps/${roadmaptitle}/${topicl1}/leveln`}
          className="w-[400px] text-[32px] text-center bg-primary text-light py-[26px] rounded-full"
        >
          Internet
        </Link>
        <div className=" border-dark dark:border-light border-[1px] rounded-[10px] pr-2 py-[14px] transition-[border] duration-1000 ease-in-out-back">
          <p className="w-[400px] h-[72px] overflow-auto pl-2 pr-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
            impedit distinctio ut, dolores ratione libero sint reprehenderit
            dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi?
            Alias reprehenderit nam ipsum placeat.
          </p>
        </div>
      </div>
      <RightLine />
      <div className="flex justify-between w-full px-[100px] tracking-tight font-semibold">
        <div className="w-[400px] text-[32px] text-center bg-primary text-light py-[26px] rounded-full">
          HTML
        </div>
        <div className=" border-dark dark:border-light border-[1px] rounded-[10px] pr-2 py-[14px] transition-[border] duration-1000 ease-in-out-back">
          <p className="w-[400px] h-[72px] overflow-auto pl-2 pr-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
            impedit distinctio ut, dolores ratione libero sint reprehenderit
            dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi?
            Alias reprehenderit nam ipsum placeat.
          </p>
        </div>
      </div>
      <LeftLine />
      <div className="flex justify-between w-full flex-row-reverse px-[100px] tracking-tight font-semibold">
        <div className="w-[400px] text-[32px] text-center bg-primary text-light py-[26px] rounded-full">
          CSS
        </div>
        <div className=" border-dark dark:border-light border-[1px] rounded-[10px] pr-2 py-[14px] transition-[border] duration-1000 ease-in-out-back">
          <p className="w-[400px] h-[72px] overflow-auto pl-2 pr-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
            impedit distinctio ut, dolores ratione libero sint reprehenderit
            dolorem suscipit! Aspernatur aut dolorum deleniti sapiente eligendi?
            Alias reprehenderit nam ipsum placeat.
          </p>
        </div>
      </div>
      <EndLineRight />
    </>
  );
};

export default LevelN;
