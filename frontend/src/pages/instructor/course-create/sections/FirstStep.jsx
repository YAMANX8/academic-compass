import { TextField } from "../../../../components";
import { Icon } from "@iconify/react";
const FirstStep = ({ courseData, handleChange }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h4>What is your course title?</h4>
      <TextField
      label="course title"
        type="text"
        onChange={handleChange}
        name="title"
        value={courseData.title}
        size="sm"
        className="max-w-xs"
        placeholder="Learn HTML basics"
        helperText={
          <>
            <Icon icon="mdi:information" fontSize={24} />
            Your course title should not exceed 60 characters in length
          </>
        }
      />
    </div>
  );
};

export default FirstStep;
