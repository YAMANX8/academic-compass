import { useState } from "react";
import ListItem from "./list-item";
import { Button } from "../../../../components";
import { Icon } from "@iconify/react";

const TopicList = ({ id, title, lessons }) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   *  item_id: 36,
          item_title: "video intro to HTML Advanced Techniques",
          item_no: 1,
          item_type: "video",
          topics_sequence: "HTML Basics",
   */
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-base font-medium text-primary">{title}</h3>
        <Button size="sm" variant="text" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <Icon icon="mdi:chevron-up-box-outline" fontSize={24} />
          ) : (
            <Icon icon="mdi:chevron-down-box-outline" fontSize={24} />
          )}
        </Button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 rounded bg-secondary/20 p-2">
          {lessons.map((lesson) => (
            <ListItem
              key={lesson.item_id}
              id={lesson.item_id}
              title={lesson.item_title}
              type={lesson.item_type}
              topicSequence={lesson.topics_sequence}
            />
          ))}
          <Button
            size="md"
            variant="outlined"
            className="self-start"
            color="accent"
          >
            <Icon icon="mdi:plus" />
            New item
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopicList;
