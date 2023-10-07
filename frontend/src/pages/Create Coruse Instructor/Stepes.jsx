import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsProjectorFill as ProjectorFill,
  BsPlayBtnFill as Video,
  BsCodeSlash as CodeSlash,
  BsCaretDownSquareFill as DownSquareFill,
} from "react-icons/bs";
function Stepes() {
  const [progress, setProgress] = useState(33.333);
  const [currentStep, setCurrentStep] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const levels = ["All Level", "Level 1", "Level n"];

  const handleContinueClick = () => {
    if (currentStep < 3) {
      //    الخطوة الحالية أقل من 3
      setCurrentStep(currentStep + 1);
      setProgress((prevProgress) => Math.min(prevProgress + 33.3333, 100));
    } else {
    }
  };
  //  شكل ابو راتب
  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress((prevProgress) => Math.max(prevProgress - 33, 0));
    }
  };
  const course = [
    {
      id: 1,
      progress: 33,
    },
  ];
  return (
    <form className="w-full">
      <div className="w-[1200px] m-auto p-0">
        <div>
          <h1 className="py-4">Stepe{currentStep}</h1>
          <div className="h-[10px] w-full max-w-screen-xl m-auto bg-gray-300 rounded-[10px] relative">
            <div
              className="h-full bg-blue-800 rounded-[10px]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* القسم الاول  */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center justify-center max-w-screen-xl ">
            <h2 className="font-poppins text-[32px] text-dark  dark:text-light tracking-tight leading-l mt-[49px] ">
              What is the title of your course
            </h2>
            <input
              type="text"
              placeholder="For example: Learn Html basics in one course"
              className="w-[500px] p-[10px] mt-[32px] rounded-[5px] bg-light border border-gray-400"
            />
            <h1 className="font-poppins text-[20px] tracking-tight leading-l py-[50px]">
              Your course title should not exceed 60 characters in length
            </h1>
          </div>
        )}
        {/* القسم الثاتي */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center justify-center max-w-screen-xl ">
            <div className="text-dark text-[32px] py-[50px] tracking-tight leading-l dark:text-light">
              Whate category does your educational course belong to ?
            </div>

            <div className="flex items-center justify-center gap-4">
              <button className="border px-[50px] dark:border-light  py-[50px] flex flex-col items-center justify-center border-dark text-[20px] tracking-tight rounded-[5px]">
                <ProjectorFill />
                Project Based
              </button>
              <button className="border px-[50px] dark:border-light py-[50px] flex flex-col items-center justify-center border-dark text-[20px] tracking-tight rounded-[5px]">
                <Video />
                Observational
              </button>
              <button className="border px-[50px] dark:border-light  py-[50px] flex flex-col items-center justify-center border-dark text-[20px] tracking-tight rounded-[5px]">
                <CodeSlash />
                Challenge Based
              </button>
            </div>
          </div>
        )}
        {/* القسم الثالث */}
        {currentStep === 3 && (
          <form className=" flex flex-col items-center justify-center ">
            {" "}
            <div className="text-dark text-[32px]  flex items-center justify-center py-[32px] tracking-tight leading-l dark:text-light ">
              Whate category does your educational course belong to ?
            </div>
            <div className="relative w-64 mb-[146px]   ">
              <div className="flex items-center justify-center border dark:border-light dark:bg-light border-dark rounded px-3 py-2">
                <DownSquareFill
                  className="text-[45px] cursor-pointer absolute ml-[218px] h-full dark:text-dark dark:border "
                  onClick={() => setIsOpen(!isOpen)}
                />
                <input
                  type="text"
                  value={selectedValue}
                  readOnly
                  className="bg-light flex-1 dark:text-dark   font-semibold outline-none "
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
              {isOpen && (
                <div className="absolute w-full dark:text-dark  mt-1 border-t-0 border  bg-light z-10 shadow-md rounded-b ">
                  {levels.map((level, index) => (
                    <div
                      key={index}
                      className="px-4 py-2  text-[20px]  cursor-pointer hover:bg-gray-200 flex items-center justify-center"
                      onClick={() => {
                        setSelectedValue(level);
                        setIsOpen(false);
                      }}
                    >
                      {level}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
      <div className="mt-[40px]">
        <hr className="border-t border-gray-400" />
        <div className="flex justify-between  my-4 mx-[120px]">
          <Link
            onClick={handleBackClick}
            className="border py-[10px] px-[20px] rounded-[5px] border-accent text-primary font-poppins leading-l tracking-tight text-xl dark:text-light"
          >
            Back
          </Link>
          <Link
            onClick={handleContinueClick}
            className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
          >
            Continue
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Stepes;
