import React from "react";
import { BsPerson as Person, BsArrowRight as ArrowRight } from "react-icons/bs";
import Images1 from "../../assets/images/teacher.svg";
import Images2 from "../../assets/images/supervision.svg";
import Images3 from "../../assets/images/manager.svg";
import { Button } from "../../components";
import { Helmet } from "react-helmet-async";
import { paths } from "../../routes/paths";
function OthersHome() {
  return (
    <>
      <Helmet>
        <title>Become part of AC</title>
      </Helmet>
      <main className="flex flex-col gap-8 w-[1200px]">
        <section className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-[48px] text-primary font-semibold tracking-tight leading-l max-w-[630px]">
              Lecturers: Online Educators
            </h2>
            <p className="text-[32px] max-w-[488px] font-Medium leading-l dark:text-light text-dark">
              How they utilize their expertise and knowledge to enrich online
              learning experiences.
            </p>

            <div className="flex gap-4">
              <Button page={paths.auth.instructor.register}>
                {" "}
                <Person />
                Become an Instructor
              </Button>{" "}
              <Button variant="outlined" page={paths.auth.instructor.login}>
                <ArrowRight /> Already an Instructor
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center w-[500px]">
            <img src={Images1} alt="instructor char" />
          </div>
        </section>

        {/*  */}
        <section className="flex items-center justify-between w-full">
          <div className="flex justify-center items-center w-[500px]">
            <img src={Images2} alt="supervisor char" />
          </div>
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-[48px] text-primary font-semibold tracking-tight leading-l max-w-[630px]">
              Academic Supervisors: Supporters and Guides
            </h2>
            <p className="text-[32px] max-w-[488px] font-Medium leading-l dark:text-light text-dark">
              How they assist students in achieving their academic and research
              goals.
            </p>

            <div className="flex gap-4">
              <Button page="/not-found">
                {" "}
                <Person />
                Become a Supervisor
              </Button>{" "}
              <Button variant="outlined" page="/not-found">
                <ArrowRight /> Already a Supervisor
              </Button>
            </div>
          </div>
        </section>

        {/*  */}
        <section className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-[22px]">
            <h2 className="text-[48px] text-primary font-semibold tracking-tight leading-l max-w-[630px]">
              Academic Directors: Planners and Coordinators
            </h2>
            <p className="text-[32px] max-w-[488px] font-Medium leading-l dark:text-light text-dark">
              How they ensure the quality and effectiveness of educational
              programs and courses.
            </p>

            <div className="flex gap-4">
              <Button page="/not-found">
                {" "}
                <Person />
                Become a Director
              </Button>{" "}
              <Button variant="outlined" page="/not-found">
                <ArrowRight /> Already a Director
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-center w-[500px]">
            <img src={Images3} alt="instructor char" />
          </div>
        </section>
      </main>
    </>
  );
}

export default OthersHome;
