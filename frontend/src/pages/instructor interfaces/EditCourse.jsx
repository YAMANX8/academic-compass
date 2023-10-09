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
        {selectedTab === 1 && <Info />}
        {selectedTab === 2 && <Content />}
      </div>
    </section>
  );
}

export default EditCourse;
