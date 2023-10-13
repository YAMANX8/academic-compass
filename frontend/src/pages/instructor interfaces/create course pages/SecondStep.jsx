import {
  BsProjectorFill as ProjectorFill,
  BsPlayBtnFill as Video,
  BsCodeSlash as CodeSlash,
} from "react-icons/bs";

const SecondStep = ({ courseData, handleChange }) => {
  const style = `transition-colors duration-300 ease-in-out-back w-[250px] aspect-[4/3] text-dark dark:text-light cursor-pointer border dark:border-light flex flex-col items-center justify-center border-dark text-[20px] tracking-tight rounded-[5px]`;
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-[32px] tracking-tight leading-l font-bold">
        What category does your educational course belong to?
      </h2>

      <div className="flex items-center justify-center gap-4">
        <label
          className={`${
            courseData.courseType === "Project Based" && `bg-accent text-light`
          } ${style}`}
        >
          <input
            className="hidden"
            type="radio"
            name="courseType"
            value="Project Based"
            checked={courseData.courseType === "Project Based"}
            onChange={handleChange}
          />
          <ProjectorFill />
          Project Based
        </label>
        <label
          className={`${
            courseData.courseType === "Observational Based" &&
            `bg-accent text-light`
          } ${style}`}
        >
          <input
            className="hidden"
            type="radio"
            name="courseType"
            value="Observational Based"
            checked={courseData.courseType === "Observational Based"}
            onChange={handleChange}
          />
          <Video />
          Observational
        </label>
        <label
          className={`${
            courseData.courseType === "Challenge Based" &&
            `bg-accent text-light`
          } ${style}`}
        >
          <input
            className="hidden"
            type="radio"
            name="courseType"
            value="Challenge Based"
            checked={courseData.courseType === "Challenge Based"}
            onChange={handleChange}
          />
          <CodeSlash />
          Challenge Based
        </label>
      </div>
    </div>
  );
};

export default SecondStep;
