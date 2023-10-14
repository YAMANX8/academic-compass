const FirstStep = ({ courseData, handleChange }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-[32px] tracking-tight leading-l font-bold">
        What is the title of your course?
      </h2>
      <input
        type="text"
        maxLength={60}
        onChange={handleChange}
        name="title"
        value={courseData.title}
        placeholder="For example: Learn Html basics in one course"
        className="w-[500px] p-[10px] mt-8 rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-gray-400 transition-colors duration-1000 ease-in-out-back"
      />
      <h1 className="text-[20px] tracking-tight leading-l mt-4">
        Your course title should not exceed 60 characters in length
      </h1>
    </div>
  );
};

export default FirstStep;
