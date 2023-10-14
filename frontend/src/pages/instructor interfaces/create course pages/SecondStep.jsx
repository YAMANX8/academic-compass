import {
  BsProjectorFill as ProjectorFill,
  BsPlayBtnFill as Video,
  BsCodeSlash as CodeSlash,
} from "react-icons/bs";

const SecondStep = ({ courseData, handleChange, list }) => {
  const style = `transition-colors duration-300 ease-in-out-back w-[250px] aspect-[4/3] text-dark dark:text-light cursor-pointer border dark:border-light flex flex-col items-center justify-center border-dark text-[20px] tracking-tight rounded-[5px]`;
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-[32px] tracking-tight leading-l font-bold">
        What category does your educational course belong to?
      </h2>

      <div className="flex items-center justify-center gap-4">
        {list.map((item) => (
          <label
            key={item.id}
            className={`${
              courseData.courseType == item.id && `bg-accent text-light`
            } ${style}`}
          >
            <input
              className="hidden"
              type="radio"
              name="courseType"
              value={item.id}
              checked={courseData.courseType === item.id}
              onChange={handleChange}
            />
            {item.title == "project based" && <ProjectorFill />}
            {item.title == "beginner|advanced" && <Video />}
            {item.title == "observational learn" && <CodeSlash />}
            {item.title}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SecondStep;
