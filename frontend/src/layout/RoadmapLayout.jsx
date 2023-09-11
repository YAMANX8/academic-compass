import { useState } from "react";
import { Outlet } from "react-router-dom";
const RoadmapLayout = () => {
  const [title, setTitle] = useState("");
  return (
    <div className="w-[1200px]">
      <h1 className="mb-4 font-bold text-[48px] tracking-tight">
        {title} Roadmap
      </h1>
      <div className="flex flex-col items-center">
        <div className="w-full p-4 text-dark dark:text-light bg-secondary dark:bg-secondary-dark font-semibold tracking-tight text-center transition-all duration-1000 ease-in-out-back">
          Beginning
        </div>
        
        <Outlet context={[title, setTitle]}/>

        <div className="w-full p-4 text-dark dark:text-light bg-secondary dark:bg-secondary-dark font-semibold tracking-tight text-center transition-all duration-1000 ease-in-out-back">
          End
        </div>
      </div>
    </div>
  );
};

export default RoadmapLayout;
