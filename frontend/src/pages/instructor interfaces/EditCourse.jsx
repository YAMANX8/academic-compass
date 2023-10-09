import React, { useState } from "react";
import {
  BsCaretDownSquareFill as DownSquareFill,
  BsPlus as Add,
} from "react-icons/bs";
import { Content, Info } from "../index";
function EditCourse() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const levels = ["Beginner", "Intermediate", "Expert"];
  const project = ["project based", "beginner|advanced", "observational learn"];
  const [selectedProject, setSelectedProject] = useState("");
  const toggleDropdown = (field) => {
    if (activeField === field) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(true);
      setActiveField(field);
    }
  };
  // styles
  const headings = `text-[32px] font-bold tracking-tight text-dark dark:text-light transition-all duration-1000 ease-in-out-back`;
  const inputs = `leading-[39px] w-full p-[10px] bg-light dark:bg-dark text-dark dark:text-light rounded-[7px] border border-black/50 dark:border-white/50 text-[32px] tracking-tight transition-color duration-1000 ease-in-out-back`;
  const selects = `absolute top-0 right-0 cursor-pointer text-dark dark:text-light transition-all duration-1000 ease-in-out-back`;
  const menu = `absolute w-full border-t-0 border bg-light dark:bg-dark z-10 shadow-md rounded-b`;

  return (
    <section className="w-[1200px]">
      <div className="flex gap-[24px] items-center justify-center">
        <label
          className={`hover:bg-accent hover:text-light hover:shadow-lg hover:shadow-black/40 active:bg-primary rounded-lg p-[24px] ${
            selectedTab === 1
              ? "text-accent dark:text-accent-dark"
              : "text-dark dark:text-light"
          } font-medium text-[32px] tracking-tight`}
          onClick={() => {
            setSelectedTab(1);
          }}
        >
          Course Info
        </label>
        <div className="h-[80px] w-[2px] bg-gray-400"></div>
        <label
          className={`hover:bg-accent hover:text-light hover:shadow-lg hover:shadow-black/40 active:bg-primary rounded-lg p-[24px] ${
            selectedTab === 2
              ? "text-accent dark:text-accent-dark"
              : "text-dark dark:text-light"
          } font-medium text-[32px] tracking-tight`}
          onClick={() => {
            setSelectedTab(2);
          }}
        >
          Course Content
        </label>
      </div>
      <div
        className="mt-[32px] p-[32px]"
        style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
      >
        {selectedTab === 1 && (
          <form className="grid-cols-2 grid gap-12">
            <div className="flex flex-col gap-4">
              <h2 className={headings}>Course title</h2>
              <input
                type="text"
                placeholder="Ex: Learn the basics of ..."
                className={inputs}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className={headings}>Course subtitle</h2>
              <input
                type="text"
                placeholder="Ex: improve your skills..."
                className={inputs}
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className={headings}>Select course Level</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="All level"
                  className={inputs}
                  onClick={() => toggleDropdown("level")}
                />
                {isOpen && activeField === "level" && (
                  <div className={menu}>
                    {levels.map((level, index) => (
                      <div
                        key={index}
                        className="px-4 p-1 text-[20px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center"
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
                  size={60}
                  className={selects}
                  onClick={() => toggleDropdown("level")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className={headings}>Select course type</h2>
              <div className="relative">
                <input
                  type="text"
                  value={selectedProject}
                  placeholder="Project Based"
                  className={inputs}
                  onClick={() => toggleDropdown("project")}
                />
                {isOpen && activeField === "project" && (
                  <div className={menu}>
                    {project.map((proj, index) => (
                      <div
                        key={index}
                        className="px-4 p-1 text-[20px] cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 flex items-center justify-center"
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
                  size={60}
                  className={selects}
                  onClick={() => toggleDropdown("project")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <h2 className={headings}>Course description</h2>
              <textarea
                placeholder="Insert your course description here"
                cols="30"
                rows="5"
                className={inputs}
              />
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <h2 className={headings}>What’s taught in your course?</h2>
              <input
                type="text"
                placeholder="Ex: how to style a website using ..."
                className={inputs}
              />
              <button className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2">
                <Add />
                <span>insert one more item</span>
              </button>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <h2 className={headings}>
                What are the prerequisites for your course?
              </h2>
              <input
                type="text"
                placeholder="Ex: familiarity with HTML, CSS, and JavaScript"
                className={inputs}
              />
              <button className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2">
                <Add />
                <span>insert one more item</span>
              </button>
            </div>
            <div className="flex flex-col gap-4 col-span-2">
              <h2 className={headings}>
                Who is the intended audience for this course?
              </h2>
              <input
                type="text"
                placeholder="Ex: frontend developers who love to extend their skill set"
                className={inputs}
              />
              <button className="p-[10px] self-start border border-primary bg-light rounded-[5px] text-primary flex items-center gap-2">
                <Add />
                <span>insert one more item</span>
              </button>
            </div>

            <div className="flex flex-col gap-4 col-span-2">
              <h2 className={headings}>
                Would you like to publish your course ?
              </h2>
              <div className="flex gap-4">
                <button>Activate the course</button>
                <button className="border border-accent p-[10px]  dark:bg-light rounded-[5px] font-semibold text-primary">
                  Inactivate the course
                </button>
              </div>
            </div>
            <div className="flex flex-row-reverse col-span-2">
              <button className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent">
                Sava
              </button>
            </div>
          </form>
        )}
        {selectedTab === 2 && <Content />}
      </div>
    </section>
  );
}

export default EditCourse;
