import { useState } from "react";
import { useParams } from "react-router-dom";
const RoadmapLayout = ({ children }) => {
  const { topicL1Id } = useParams();
  const [title, setTitle] = useState("");
  return (
    <div className="w-[1200px]">
      <div className="flex justify-between">
        <h1 className="mb-4 font-bold text-[48px] tracking-tight">
          {title} Roadmap
        </h1>
        {!topicL1Id && (
          <div className="flex gap-4 text-sm font-semibold items-center">
            <span className="bg-primary p-3"></span>
            <span>essential topics</span>
            <span className="bg-accent p-3"></span>
            <span>advance topics</span>
            <span className="bg-advance p-3"></span>
            <span>additional topics</span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full p-4 text-dark dark:text-light bg-secondary dark:bg-secondary-dark font-semibold tracking-tight text-center transition-all duration-1000 ease-in-out-back">
          Beginning
        </div>
          {children}
        <div className="w-full p-4 text-dark dark:text-light bg-secondary dark:bg-secondary-dark font-semibold tracking-tight text-center transition-all duration-1000 ease-in-out-back">
          End
        </div>
      </div>
    </div>
  );
};

export default RoadmapLayout;
