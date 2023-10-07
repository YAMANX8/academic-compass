import React from "react";
import { BsPerson as Person ,
    BsArrowRight as ArrowRight
} from "react-icons/bs";
import Images1 from "../assets/images/teacher.svg"
import Images2 from "../assets/images/supervision.svg"
import Images3 from "../assets/images/manager.svg"
function Home_Instructor() {
  return (
    <div className="container mx-auto px-4  ">
      {/* Main Content */}
      <main className="py-8 flex flex-col space-y-8">
       
        <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 mb-8">
          <div className="flex-1">
            <h2 className="text-[48px] text-primary font-semibold tracking-tight leading-l mb-4 whitespace-nowrap ">
              Lecturers: Online Educators
            </h2>
            <p className="  text-[32px] mb-4 max-w-[500px]  font-Medium leading-l dark:text-light  text-dark">
              How they utilize their expertise and knowledge to enrich online
              learning experiences.
            </p>

            <div className="flex space-x-4">
              <button className="w-[241px] h-[44px] font-semibold inline-flex p-2.5 px-5 justify-center items-center rounded-md bg-gradient-to-r text-light from-[#253AD4] to-[#6A1EAD]">
                <Person className="mr-2" />
                Become an Instructor
              </button>
              <button className="  w-[241px] h-[44px] font-semibold tracking-tight inline-flex p-2.5 px-5 justify-center items-center space-x-2.5 rounded-md border text-accent border-[#253AD4] bg-[#EEEFFC]">
               <ArrowRight className="mr-2" /> Already an Instructor
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src={Images1}
              alt="Image 1"
              className="max-w-full h-auto"
            />
          </div>
        </section>

        {/*  */}
        <section className="flex flex-col-reverse md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 mb-8">
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
           src={Images2}
              alt="Image 2"
              className="max-w-full h-auto"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[48px] text-primary font-semibold tracking-tight leading-l mb-4">Academic Supervisors: Supporters and Guides</h2>
            <p className=" text-[32px] mb-4 max-w-[500px]  font-Medium leading-l dark:text-light  text-dark ">
            How they assist students in achieving their academic and research goals.
            </p>
            <div className="flex space-x-4">
            <button className="w-[241px] h-[44px] font-semibold inline-flex p-2.5 px-5 justify-center items-center rounded-md bg-gradient-to-r text-light from-[#253AD4] to-[#6A1EAD]">
                <Person className="mr-2" />
                Become an Instructor
              </button>
              <button className=" w-[241px] h-[44px] font-semibold tracking-tight inline-flex p-2.5 px-5 justify-center items-center space-x-2.5 rounded-md border text-accent border-[#253AD4] bg-[#EEEFFC]">
               <ArrowRight className="mr-2" /> Already an Instructor
              </button>
            </div>
          </div>
        </section>

        {/*  */}
        <section className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h2 className="text-[48px] text-primary font-semibold tracking-tight leading-l mb-4">Academic Directors: Planners and Coordinators</h2>
            <p className=" text-[32px] mb-4 max-w-[500px]  font-Medium leading-l dark:text-light   text-dark">
            How they ensure the quality and effectiveness of educational programs and courses.
            </p>
            <div className="flex space-x-4">
            <button className="w-[241px] h-[44px] font-semibold inline-flex p-2.5 px-5 justify-center items-center rounded-md bg-gradient-to-r text-light from-[#253AD4] to-[#6A1EAD]">
                <Person className="mr-2" />
                Become an Instructor
              </button>
              <button className=" w-[241px] h-[44px] font-semibold tracking-tight inline-flex p-2.5 px-5 justify-center items-center space-x-2.5 rounded-md border text-accent border-[#253AD4] bg-[#EEEFFC]">
               <ArrowRight className="mr-2" /> Already an Instructor
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
             src={Images3}
              alt="Image 3"
              className="max-w-full h-auto"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home_Instructor;
