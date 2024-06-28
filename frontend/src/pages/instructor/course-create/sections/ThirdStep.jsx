import { BsCaretDownSquareFill as DownSquareFill } from "react-icons/bs";
import { Select } from "../../../../components";
const ThirdStep = ({ courseData, handleChange, list }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h4>What is the level of the educational course you offer?</h4>
      <Select
        id="level"
        value={courseData.courseLevel}
        onChange={handleChange}
        name="courseLevel"
        size="sm"
        className="w-full max-w-xs"
      >
        <option value="">-- Select Level --</option>
        {list.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ThirdStep;
