import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Chip } from "../../../../components";
import { Icon } from "@iconify/react";
import Video from "../components/item-types/video";
import Article from "../components/item-types/article";
import Quiz from "../components/item-types/quiz";

const ListItem = ({ id, title, type, topicSequence }) => {
  // TODO: states
  const [icon, setIcon] = useState("mdi:file-document-outline");
  const [isEditing, setIsEditing] = useState(false);
  // TODO: functions
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
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const renderEditComponent = () => {
    switch (type) {
      case "article":
        return <Article />;
      case "quiz":
        return <Quiz />;
      case "video":
        return <Video />;
      default:
        return null;
    }
  };
  // TODO: rendering views
  const renderButtonsWithoutEdit = (
    <>
      <Chip size="sm" variant="soft" color="accent">
        {topicSequence}
      </Chip>
      <Chip size="sm" variant="soft" color="accent">
        <Icon icon={icon} fontSize={24} />
      </Chip>
      <Button size="sm" variant="outlined" color="error" className="self-start">
        <Icon icon="mdi:trash-can-outline" />
      </Button>
      <Button
        size="sm"
        color="accent"
        className="self-start"
        onClick={handleEditClick}
      >
        <Icon icon="mdi:pencil" />
        Edit
      </Button>
    </>
  );
  const renderEditArticleButtons = (
    <>
      <Chip size="sm" variant="soft" color="accent">
        <Icon icon={icon} fontSize={24} />
      </Chip>
      <Button
        size="sm"
        variant="soft"
        color="error"
        onClick={handleCancelClick}
      >
        <Icon icon="mdi:cancel" />
        Cancel
      </Button>
      <Button size="sm" variant="soft" color="success">
        <Icon icon="mdi:content-save-outline" />
        Save
      </Button>
    </>
  );
  const renderEditVideoAndQuizButtons = (
    <>
      <Chip size="sm" variant="soft" color="accent">
        <Icon icon={icon} fontSize={24} />
      </Chip>
      <Button
        size="sm"
        variant="soft"
        color="error"
        onClick={handleCancelClick}
      >
        <Icon icon="mdi:cancel" />
        Cancel
      </Button>
    </>
  );

  return (
    <>
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
          {isEditing && type === "article"
            ? renderEditArticleButtons
            : isEditing
              ? renderEditVideoAndQuizButtons
              : renderButtonsWithoutEdit}
        </div>
      </div>
      {isEditing && renderEditComponent()}
    </>
  );
};

export default ListItem;
