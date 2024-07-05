import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Chip } from "../../../../components";
import { Icon } from "@iconify/react";
import Video from "../components/item-types/video";
import Article from "../components/item-types/article";
import Quiz from "../components/item-types/quiz";
import { useCmsContext } from "../../../../context/hooks/use-cms-context";
import { paths } from "../../../../routes/paths";
import { useRouter, useParams } from "../../../../routes/hooks";
const ListItem = ({
  itemId,
  title,
  type,
  topicSequence,
  setModalContent,
  toggleModal,
}) => {
  // TODO: states
  const router = useRouter();
  const {
    handleDeleteItem,
    handleGetVideo,
    handleGetQuiz,
    handleGetArticle,
    handlePutArticle,
  } = useCmsContext();
  const [icon, setIcon] = useState("mdi:file-document-outline");
  const [isEditing, setIsEditing] = useState(false);
  const {id} = useParams()
  // TODO: functions
  useEffect(() => {
    switch (type) {
      case "article":
        setIcon("mdi:file-document-outline");
        break;
      case "Code_Session":
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
  const handleEditClick = async () => {
    switch (type) {
      case "video":
        await handleGetVideo(itemId);
        break;
      case "quiz":
        await handleGetQuiz(itemId);
        break;
      case "article":
        await handleGetArticle(itemId);
        console.log(itemId);
        break;
      case "Code_Session":
        router.push(`${paths.course.root}/${id}/${paths.course.manage.codeSession}`);
      default:
        break;
    }
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
        return (
          <Quiz
            toggleModal={toggleModal}
            setModalContent={setModalContent}
            itemId={itemId}
          />
        );
      case "video":
        return <Video id={itemId} />;
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
      <Button
        size="sm"
        variant="outlined"
        color="error"
        className="self-start"
        onClick={() => handleDeleteItem(itemId)}
      >
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
      <Button
        size="sm"
        variant="soft"
        color="success"
        onClick={() => handlePutArticle(itemId)}
      >
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
