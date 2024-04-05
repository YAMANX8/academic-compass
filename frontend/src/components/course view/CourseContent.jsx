import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  BsCameraVideo as Video,
  BsQuestionCircle as Quiz,
  BsBook as Article,
  BsChevronUp as ChevronUp,
  BsChevronDown as ChevronDown,
  BsFillCheckSquareFill as Check,
} from "react-icons/bs";
import { paths } from "../../routes/paths";
const CourseContent = ({ courseContent }) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(
    courseContent.map((content) => ({
      outer: true,
      inner: Array(content.subTopics.length).fill(true),
    }))
  ); //لك اللّاوي الشغل لك وليييييي

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
                    to={
                      item.type == "video"
                        ? `${paths.course.details}/${id}/${paths.course.content.video}/${item.id}`
                        : item.type == "article"
                        ? `${paths.course.details}/${id}/${paths.course.content.article}/${item.id}`
                        : `${paths.course.details}/${id}/${paths.course.content.quiz}/${item.id}`
                    }
                    className={`bg-light dark:bg-dark text-dark dark:text-light flex p-4 items-center justify-between transition-all duration-1000 ease-in-out-back `}
                  >
                    <div className="flex gap-4">
                      <span className="text-[24px]">
                        {item.type == "video" && <Video />}
                        {item.type == "article" && <Article />}
                        {item.type == "quiz" && <Quiz />}
                      </span>
                      <p className="text-accent dark:text-accent-dark tracking-tight transition-all duration-1000 ease-in-out-back">
                        {item.title}
                      </p>
                    </div>
                    {item?.is_completed && (
                      <Check
                        size={25}
                        className="text-accent dark:text-accent-dark transition-all duration-1000 ease-in-out-back"
                      />
                    )}
                  </Link>
                ))}
              </details>
            ))}
          </div>
        </details>
      ))}
    </>
  );
};

export default CourseContent;
