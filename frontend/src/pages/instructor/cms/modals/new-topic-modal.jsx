import React, { useState, useEffect } from "react";
import { Select, Button } from "../../../../components";
import { Icon } from "@iconify/react";
import { useCmsContext } from "../../../../context/hooks/use-cms-context";
const NewTopicModal = ({ toggleModal }) => {
  // TODO: states
  const { assigningTopics, handleNewTopic } = useCmsContext();
  const [selectedTopic, setSelectedTopic] = useState("");
  // TODO: functions
  const handleSelectChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleNewTopic(selectedTopic);
        toggleModal();
      }}
    >
      <div className="w-96 rounded bg-white p-4 dark:bg-black">
        <Select
          label="topic level"
          value={selectedTopic}
          onChange={handleSelectChange}
        >
          <option value="">-- Select Level --</option>
          {assigningTopics.map((topic) => (
            <option key={topic.topic_level1_id} value={JSON.stringify(topic)}>
              {topic.topic_title}
            </option>
          ))}
        </Select>
      </div>
      <Button className="self-end" size="sm">
        <Icon icon="mdi:content-save-outline" fontSize={18} />
        Save
      </Button>
    </form>
  );
};

export default NewTopicModal;
