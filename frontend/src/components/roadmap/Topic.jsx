const Topic = ({
  topicId,
  setIsOpen,
  topicTitle,
  modalTitle,
  topicDescription,
  modalLinks,
  topicStatus,
  last = false,
  setIsLast = () => false,
  category = "Basic",
  isRight = true,
}) => {
  return (
    <div
      className={`flex justify-between w-full ${
        isRight && "flex-row-reverse"
      } px-[100px] tracking-tight font-semibold`}
    >
      <button
        onClick={() => {
          modalTitle(
            `${
              topicTitle[0].toUpperCase() + topicTitle.slice(1).toLowerCase()
            } (${topicStatus})`
          );
          modalLinks({
            search: `/student/search/by-topic/${topicId}`,
            deeper: `${topicId}`,
          });
          if (last) setIsLast(true);
          else setIsLast(false);
          setIsOpen(true);
        }}
        className={`w-[400px] text-[32px] text-center ${
          category == "Advance" && "bg-accent"
        } ${category == "Aditional" && "bg-advance"} ${
          category == "Basic" && "bg-primary"
        } text-light py-[26px] rounded-full`}
      >
        {topicTitle}
      </button>
      <div className=" border-dark dark:border-light border-[1px] rounded-[10px] pr-2 py-[14px] transition-[border] duration-1000 ease-in-out-back">
        <p className="w-[400px] h-[72px] overflow-auto pl-2 pr-2">
          {topicDescription}
        </p>
      </div>
    </div>
  );
};

export default Topic;
