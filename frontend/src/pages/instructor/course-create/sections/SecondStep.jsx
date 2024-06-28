import {
  BsProjectorFill as ProjectorFill,
  BsPlayBtnFill as Video,
  BsCodeSlash as CodeSlash,
} from "react-icons/bs";
import { Icon } from "@iconify/react";
const SecondStep = ({ courseData, handleChange, list }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h4>What category does your educational course belong to?</h4>

      <div className="flex max-w-xl flex-wrap items-center justify-center gap-4">
        {list.map((item) => (
          <label
            key={item.id}
            className={`${
              courseData.courseType == item.id && `!bg-primary !text-white`
            }
            flex h-32 w-44 flex-col items-center justify-center rounded-lg bg-primary-lighter text-primary-dark`}
          >
            <input
              className="hidden"
              type="radio"
              name="courseType"
              value={item.id}
              checked={courseData.courseType === item.id}
              onChange={handleChange}
            />
            {item.title == "Project Based" && (
              <Icon icon="ph:blueprint" fontSize={24} />
            )}
            {item.title == "Challenge Based" && (
              <Icon icon="mdi:puzzle" fontSize={24} />
            )}
            {item.title == "Technology Based" && (
              <Icon icon="mdi:tools" fontSize={24} />
            )}
            {item.title == "Theory Based" && (
              <Icon icon="mdi:book-open" fontSize={24} />
            )}
            {item.title == "Methodologies Based" && (
              <Icon icon="mdi:sitemap" fontSize={24} />
            )}
            <span className="text-center text-xl font-medium">
              {item.title}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SecondStep;
