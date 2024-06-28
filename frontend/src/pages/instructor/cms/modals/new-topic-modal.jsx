import React, { useState, useEffect } from "react";
import { Select, Button } from "../../../../components";
import { Icon } from "@iconify/react";

const NewTopicModal = () => {
  // TODO: states
  const [topics, setTopics] = useState([
    { topic_level1_id: 0, topic_title: "" },
  ]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const data = [
    {
      topic_level1_id: 1,
      topic_title: "HTML",
    },
    {
      topic_level1_id: 2,
      topic_title: "CSS",
    },
    {
      topic_level1_id: 3,
      topic_title: "JavaScript",
    },
  ];

  // TODO: functions
  useEffect(() => {
    setTopics(data);
  }, []);
  const handleSelectChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(selectedTopic);
      }}
    >
      <div className="w-96 rounded bg-white p-4 dark:bg-black">
        <Select
          label="topic level"
          value={selectedTopic}
          onChange={handleSelectChange}
        >
          <option value="">-- Select Level --</option>
          {topics.map((topic) => (
            <option key={topic.topic_level1_id} value={topic.topic_level1_id}>
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
