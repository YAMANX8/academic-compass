import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Chip } from "../../../../components";
import { Icon } from "@iconify/react";

/*
 item_id: 36,
          item_title: "video intro to HTML Advanced Techniques",
          item_no: 1,
          item_type: "video",
          topics_sequence: "HTML Basics",
          <Button size="md" variant="outlined" className="self-start">
            <Icon icon="mdi:plus" />
            New item
          </Button>

          mdi:file-document-outline
          mdi:file-code-outline
          mdi:file-question-outline
          mdi:file-video-outline
*/
const ListItem = ({ id, title, type, topicSequence }) => {
  /* mdi:file-document-outline
     mdi:file-code-outline
     mdi:file-question-outline
     mdi:file-video-outline
     make a state to change the icon based on the type of the item
     */
  const [icon, setIcon] = useState("mdi:file-document-outline");
  useEffect(() => {
    switch (type) {
      case "article":
        setIcon("mdi:file-document-outline");
        break;
      case "code":
        setIcon("mdi:file-code-outline");
        break;
      case "quiz":
        setIcon("mdi:file-question-outline");
        break;
      case "video":
        setIcon("mdi:file-video-outline");
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <Icon
          icon="mdi:reorder-horizontal"
          fontSize={24}
          className="text-gray-700 dark:text-gray-400"
        />

        <p className="text-base font-normal text-accent dark:text-accent-lighter">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Chip size="sm" variant="soft" color="accent">
          {topicSequence}
        </Chip>
        <Chip size="sm" variant="soft" color="accent">
          <Icon icon={icon} fontSize={24} />
        </Chip>
        <Button
          size="sm"
          variant="outlined"
          color="error"
          className="self-start"
        >
          <Icon icon="mdi:trash-can-outline" />
        </Button>
        <Button size="sm" color="accent" className="self-start">
          <Icon icon="mdi:pencil" />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
