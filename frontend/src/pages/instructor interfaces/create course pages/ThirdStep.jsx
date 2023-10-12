import { BsCaretDownSquareFill as DownSquareFill } from "react-icons/bs";

const ThirdStep = ({ courseData, handleChange }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-[32px] tracking-tight leading-l font-bold">
        What is the level of the educational course you offer?
      </h2>
      <div className="relative">
        <select
          id="level"
          value={courseData.courseLevel}
          onChange={handleChange}
          name="courseLevel"
          className="appearance-none w-[300px] h-[45px] text-dark dark:text-light bg-light dark:bg-dark rounded-[6px] border border-dark/50 dark:border-light/50 transition-all duration-1000 ease-in-out-back tracking-tight leading-l p-[10px]"
        >
          <option value="">-- Select Level --</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        <DownSquareFill
          className="absolute top-0 right-0 pointer-events-none"
          size={45}
        />
      </div>
    </div>
  );
};

export default ThirdStep;
