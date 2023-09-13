import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsCameraVideo as Video1,
  BsQuestionCircle as Quiz,
  BsBook as Article,
  BsChevronUp as ChevronUp,
  BsChevronDown as ChevronDown,
} from "react-icons/bs";
import { MdVideoLibrary as Library } from "react-icons/md";
import { Button } from "../components";
function Video() {
  const courseContent = [
    {
      id: 1,
      topicTitle: "Topic level 1",
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
            },
            {
              id: 2,
              title: "An Article",
              order: 2,
              type: "article",
            },
            {
              id: 3,
              title: "An Quiz",
              order: 3,
              type: "quiz",
            },
          ],
        },
        {
          id: 2,
          title: "Topic level N",
          items: [
            {
              id: 1,
              title: "A Lecture",
              order: 1,
              type: "video",
            },
            {
              id: 2,
              title: "An Article",
              order: 2,
              type: "article",
            },
            {
              id: 3,
              title: "A Quiz",
              order: 3,
              type: "quiz",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      topicTitle: "Topic level 1",
      subTopics: [
        {
          id: 1,
          title: "Topic level N",
          items: [
            {
              id: 4,
              title: "A Lecture",
              order: 4,
              type: "video",
            },
            {
              id: 5,
              title: "An Article",
              order: 5,
              type: "article",
            },
            {
              id: 6,
              title: "A Quiz",
              order: 6,
              type: "quiz",
            },
          ],
        },
      ],
    },
  ];

  const [isOpen, setIsOpen] = useState(
    courseContent.map((content) => ({
      outer: true,
      inner: Array(content.subTopics.length).fill(true),
    }))
  );

  console.log(isOpen);

  const toggleDetails = (index) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[index].outer = !updatedIsOpen[index].outer;
    setIsOpen(updatedIsOpen);
  };

  const toggleInnerDetails = (outerIndex, index) => {
    const updatedIsOpen = [...isOpen];
    updatedIsOpen[outerIndex].inner[index] =
      !updatedIsOpen[outerIndex].inner[index];
    setIsOpen(updatedIsOpen);
  };

  return (
    <>
      <container className="w-full px-[120px] ">
        <div className="flex space-x-[683px] underline ">
          <button> PREVIOUS</button>
          <button>NEXT</button>
        </div>

        <div className="flex justify-between  ">
          <div className="  py-[48px] ">
            <div>
              <span className=" font-semibold  text-[48px]">Item Title </span>
            </div>

            <div className=" py-[48px] ">
              <Link
                to="#"
                className=" relative bg-dark w-[800px] h-[450px] flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="bg-white p-[30px] rounded-full z-10 hover:bg-slate-500 group">
                  <Library
                    size={50}
                    className="text-black group-hover:text-white"
                  />
                </div>
              </Link>
            </div>
            <div className="px-[300px]">
              <Button> Completion Flag</Button>
               </div>
          </div>
  
         <div className="px-[370px]"> 
          <div className="  bg-secondary w-[400px]   ">
            
              {courseContent.map((content, outerIndex) => (
                <details
                  key={content.id}
                  className="bg-primary text-light cursor-pointer border-collapse border-[1px] border-dark/50 dark:border-light/50"
                  open={true}
                >
                  <summary
                    className="flex justify-between py-[13px] px-4 font-medium text-[20px] tracking-tight items-center"
                    onClick={() => toggleDetails(outerIndex)}
                  >
                    {content.topicTitle}{" "}
                    {isOpen[outerIndex].outer ? <ChevronUp /> : <ChevronDown />}
                  </summary>

                  <div
                    className={`bg-light dark:bg-dark flex flex-col transition-all duration-1000 ease-in-out-back`}
                  >
                    {content.subTopics.map((subTopic, index) => (
                      <details
                        key={subTopic.id}
                        className="bg-secondary text-dark dark:bg-secondary-dark dark:text-light cursor-pointer transition-all duration-1000 ease-in-out-back border-collapse border-t-[1px] border-dark/50 dark:border-light/50 group"
                        open={true}
                      >
                        <summary
                          className="flex justify-between py-[13px] px-4 font-medium text-[20px] tracking-tight items-center group-open:border-b-[1px] border-dark/50 dark:border-light/50"
                          onClick={() => toggleInnerDetails(outerIndex, index)}
                        >
                          {subTopic.title}{" "}
                          {isOpen[outerIndex].inner[index] ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </summary>

                        {subTopic.items.map((item) => (
                          <Link
                            key={item.id}
                            to={`${item.id}`}
                            className={`bg-light dark:bg-dark text-dark dark:text-light flex p-4 gap-4 items-center transition-all duration-1000 ease-in-out-back `}
                          >
                            <span className="text-[24px]">
                              {item.type == "video" && <Video1 />}
                              {item.type == "article" && <Article />}
                              {item.type == "quiz" && <Quiz />}
                            </span>
                            <p className="text-accent dark:text-accent-dark tracking-tight">
                              {item.title}
                            </p>
                          </Link>
                        ))}
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
            </div>
          </div>
      </container>
    </>
  );
}

export default Video;
