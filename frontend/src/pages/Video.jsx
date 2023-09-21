import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import V from "../assets/V.mp4";
import { MdVideoLibrary as Library } from "react-icons/md";
import { Button, CourseContent } from "../components";
function Video() {
  const courseContent = [
    {
      id: 1,
      topicTitle: "وهي لعيونك",
      subTopics: [
        {
          id: 1,
          title: "webpack",
          items: [
            {
              id: 1,
              title: "video intro",
              order: 1,
              type: "video",
              complete: true
            },
            {
              id: 2,
              title: "An Article",
              order: 2,
              type: "article",
              complete: true
            },
            {
              id: 3,
              title: "An Quiz",
              order: 3,
              type: "quiz",
              complete: false
            },
          ],
        },
        {
          id: 2,
          title: "يا ويل قلبي",
          items: [
            {
              id: 4,
              title: "A Lecture",
              order: 1,
              type: "video",
              complete: false
            },
            {
              id: 5,
              title: "An Article",
              order: 2,
              type: "article",
              complete: false
            },
            {
              id: 6,
              title: "A Quiz",
              order: 3,
              type: "quiz",
              complete: false
            },
          ],
        },
      ],
    },
    {
      id: 3,
      topicTitle: "لك ولييييي",
      subTopics: [
        {
          id: 3,
          title: "Topic level N",
          items: [
            {
              id: 7,
              title: "A Lecture",
              order: 1,
              type: "video",
              complete: false
            },
            {
              id: 8,
              title: "An Article",
              order: 2,
              type: "article",
              complete: false
            },
            {
              id: 9,
              title: "A Quiz",
              order: 3,
              type: "quiz",
              complete: false
            },
          ],
        },
      ],
    },
    {
      id: 4,
      topicTitle: "الشغل اللاوي",
      subTopics: [
        {
          id: 3,
          title: "Topic level N",
          items: [
            {
              id: 7,
              title: "A Lecture",
              order: 1,
              type: "video",
              complete: false
            },
            {
              id: 8,
              title: "An Article",
              order: 2,
              type: "article",
              complete: false
            },
            {
              id: 9,
              title: "A Quiz",
              order: 3,
              type: "quiz",
              complete: false
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <section className="w-full">
        <div className="flex">
          <div className="flex-1 flex justify-center">
            <div>
              <div>
                <span className=" font-semibold  text-[48px]">Item Title</span>
              </div>
              <div className="mt-[48px] mb-[32px]">
                
                  {/* <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="bg-white p-[30px] rounded-full z-10 hover:bg-slate-500 group">
                    <Library
                      size={50}
                      className="text-black group-hover:text-white "
                    />
                  </div> */}
                  <ReactPlayer
                    url={V}
                    style={{ 
                      backgroundColor: "#0D1832",
                      borderRadius: "15px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)",
                     cursor:"pointer"
                  }}
                    width="800px"
                    height="450px"
                    controls={true}
                    playing
                    playIcon={<Library size={100} className="text-light" />}
                    light={true}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 1 },
                      },
                    }}
                  />
                
                <div className="ml-[500px] py-[20px]">
                  <Button> Completion Flag</Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-secondary dark:bg-secondary-dark h-full w-[400px] transition-all duration-1000 ease-in-out-back">
              <CourseContent courseContent={courseContent} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Video;
