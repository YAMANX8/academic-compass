import React from "react";
import { Icon } from "@iconify/react";

const Lesson = ({ lesson, onDelete, getIconForLesson }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-2 text-primary">
      <div className="flex items-center space-x-2">
        <Icon icon="mdi:menu" className="w-[20px] h-[20px]" />
        <span>{lesson.item_title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="rounded bg-secondary-light px-2 py-1 text-gray-600">
          {lesson.topics_sequence}
        </span>
        <button className="flex items-center justify-center rounded border border-secondary bg-light p-1 text-accent-dark">
          <Icon icon={getIconForLesson(lesson.item_type)} className="h-[24px] w-[24px]" />
        </button>
        <button className="flex items-center justify-center rounded border-2 border-error p-1 text-error" onClick={onDelete}>
          <Icon icon="mdi:delete" className="h-[20px] w-[20px]" />
        </button>
        <button className="flex items-center justify-center gap-2 rounded border border-primary bg-primary p-1 text-white">
          <Icon icon="mdi:pencil" className="h-[20px] w-[20px]" />
          Edit
        </button>
      </div>
    </div>
  );
};

export default Lesson;
