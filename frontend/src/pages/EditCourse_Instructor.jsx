
import React, { useState } from "react";
import {
  BsCaretDownSquareFill as DownSquareFill,
  BsPlus as Add,
} from "react-icons/bs";
 import { Button } from "../components";
function EditCourse_Instructor() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const levels = ["All Level", "Level 1", "Level n"];
  const project = ["Beginner", "Intermediate", "experienced learners"];
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const toggleDropdown = (field) => {
    if (activeField === field) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
      setActiveField(field);
    }
  };

  return (
    <section>
      <div className="flex gap-[50px]  items-center justify-center">
        <label className="py-[20px] text-accent font-medium text-[32px] tracking-tight ">
          Course Info
        </label>
        <div className="h-[80px] w-[2px]   bg-gray-400"></div>
        <label className="py-[20px] text-dark font-medium text-[32px] tracking-tight dark:text-light">
          Course Content
        </label>
      </div>
      <div
        className=" mt-[43px]  w-full p-[32px] rounded-[3px] dark:border " 
        style={{ boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="flex flex-col gap-4 ">
          <div className="flex gap-[48px]">
            <div className="flex flex-col gap-2 mb-[48px]">
              <h2 className="text-[32px] text-dark font-semibold dark:text-light">Course title</h2>
              <input
                type="text"
                placeholder="Ex: Learn the basics of ..."
                className="px-[10px] bg-light w-[400px] rounded-[5px] border border-gray-400 text-[30px] tracking-tight"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[32px] text-dark font-semibold dark:text-light">Course subtitle</h2>
              <input
                type="text"
                placeholder="Ex: improve your skills..."
                className="px-[10px] bg-light w-[400px] rounded-[5px] border border-gray-400 text-[30px] tracking-tight"
              />
            </div>
          </div>

          <div className="flex gap-[48px]">
            <div className="flex flex-col gap-2">
              <h2 className="text-[32px] text-dark font-semibold dark:text-light">Select course Level</h2>
              <div className="flex relative">
                <input
                  type="text"
                  placeholder="All level"
                  className="px-[10px] pr-[50px] w-[400px] bg-light rounded-[5px] border dark:border-light border-gray-400 text-[30px] tracking-tight"
                  onClick={() => toggleDropdown("level")}
                />
                {isOpen && activeField === "level" && (
                  <div className="absolute w-full dark:text-dark mt-[50px] border-t-0 border bg-light z-10 shadow-md rounded-b">
                    {levels.map((level, index) => (
                      <div
                        key={index}
                        className="px-4 p-1 text-[20px] cursor-pointer hover:bg-gray-200 flex items-center justify-center"
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
                <DownSquareFill
                  className="absolute mx-[352px] text-5xl cursor-pointer dark:text-dark "
                  onClick={() => toggleDropdown("level")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-[32px] text-dark font-semibold dark:text-light">Select course type</h2>
              <div className="flex relative">
                <input
                  type="text"
                  value={selectedProject}
                  placeholder="Project Based"
                  className="px-[10px] pr-[50px] w-[400px]  dark:border-light  bg-light rounded-[5px] border border-gray-400 text-[30px] tracking-tight"
                  onClick={() => toggleDropdown("project")}
                />
                {isOpen && activeField === "project" && (
                  <div className="absolute w-full dark:text-dark mt-[50px] border-t-0 border bg-light z-10 shadow-md rounded-b">
                    {project.map((proj, index) => (
                      <div
                        key={index}
                        className="px-4 py-1 mt- text-[20px] cursor-pointer hover:bg-gray-200 flex items-center justify-center"
                        onClick={() => {
                          setSelectedProject(proj);
                          setIsOpen(false);
                        }}
                      >
                        {proj}
                      </div>
                    ))}
                  </div>
                )}
                <DownSquareFill
                  className="absolute mx-[352px] text-5xl cursor-pointer dark:text-dark "
                  onClick={() => toggleDropdown("project")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[100px]">
          <h2 className="text-[32px] text-dark py-4 font-semibold dark:text-light"> Course description</h2>
          <textarea
            placeholder=" insert your course description here"
            id=""
            cols="30"
            rows="5"
            className="w-full  text-[32px] border border-gray-300 bg-light rounded-[5px]  "
          ></textarea>
        </div>

        <div className="py-[20px]">
          <h1 className="text-[32px] py-[16px] text-dark font-semibold dark:text-light">
            {" "}
            Whate is taught in your course?
          </h1>
          <input
            type="text"
            placeholder="Ex: how to style a website using..."
            className=" w-full border text-[20px] rounded-[5px] border-gray-300 p-[10px] bg-light"
          />
          <div className="">
            <button className="mt-[25px] p-[10px] border border-accent dark:bg-light rounded-[5px] text-primary flex items-center">
              <Add />
              <span className="ml-2">insert one more item</span>
            </button>
          </div>
        </div>
        <div className="py-[20px]">
          <h1 className="text-[32px] py-[16px] text-dark font-semibold dark:text-light">
            {" "}
            Who is the intended audience for this course?
          </h1>
          <input
            type="text"
            placeholder="Ex:Frontend developers who love extend their skill set"
            className=" w-full border text-[20px] rounded-[5px] border-gray-300 p-[10px] bg-light"
          />
          <div className="">
            <button className="mt-[25px] p-[10px] border border-accent dark:bg-light rounded-[5px] text-primary flex items-center">
              <Add />
              <span className="ml-2">insert one more item</span>
            </button>
          </div>
        </div>
        <div className="py-[20px]">
          <h1 className="text-[32px] py-[16px] text-dark font-semibold dark:text-light ">
            {" "}
            Whate are the prerequisites for your course ?
          </h1>
          <input
            type="text"
            placeholder="Ex: familiarty with HTML,CSS,and JavaScript"
            className=" w-full border text-[20px] rounded-[5px] border-gray-300 p-[10px] bg-light"
          />
          <div className="">
            <button className="mt-[25px] p-[10px] border border-accent dark:bg-light rounded-[5px] text-primary flex items-center">
              <Add />
              <span className="ml-2">insert one more item</span>
            </button>
          </div>
        </div>

        <div className="py-[20px]">
        <h1 className="text-[32px] py-[16px] text-dark font-semibold dark:text-light">
         Would you like to publish your course ?
          </h1>
          <div className="flex gap-4 py-[16px] mb-[40px]">
            <Button>Activate the course</Button>
            <button className="border border-accent p-[10px]  dark:bg-light rounded-[5px] font-semibold text-primary">Inactivate the course</button>
          </div>
             </div>
             
             <div className="flex flex-row-reverse">
        <Button>Sava</Button>
             </div>
      </div>
    </section>
  );
}

export default EditCourse_Instructor;
