import React, { useState, useEffect } from "react";
import { Select, TextField, Button } from "../../../../components";
import { Icon } from "@iconify/react";
import { useCmsContext } from "../../../../context/hooks/use-cms-context";
const types = [
  {
    id: 2,
    type: "video",
    icon: "mdi:file-video-outline",
  },
  {
    id: 1,
    type: "article",
    icon: "mdi:file-document-outline",
  },
  {
    id: 3,
    type: "quiz",
    icon: "mdi:file-question-outline",
  },
  {
    id: 4,
    type: "code",
    icon: "mdi:file-code-outline",
  },
];

const NewItemModal = ({ id, toggleModal }) => {
  // TODO: states
  const {
    getTopicsFromL2,
    topicsL2,
    topicsLn,
    insertNewItemTopicL2,
    selectedTopics,
    newItem,
    handleChangeForNewItem,
    insertNewItemTopicLn,
    handlePostNewItem,
  } = useCmsContext();
  const [step, setStep] = useState(1);
  // ------------------------------
  // TODO: functions

  // ______________________________
  // TODO: the first step
  const renderFirstStep = (
    <>
      <div className="flex gap-4 rounded bg-white p-4 dark:bg-black">
        {types.map((type) => (
          <LessonType
            key={type.id}
            i={type.icon}
            type={type.type}
            onClick={() => handleChangeForNewItem(type.id, 1)}
            isSelected={newItem.item_type === type.id}
          />
        ))}
      </div>
      <Button
        className="self-end"
        size="sm"
        type="button"
        onClick={() => setStep(2)}
        disabled={!newItem.item_type}
      >
        Next
        <Icon icon="mdi:chevron-right" fontSize={18} />
      </Button>
    </>
  );
  // ______________________________
  // TODO: the second step
  const renderSecondStep = (
    <>
      <div className="flex w-96 flex-col gap-4 rounded bg-white p-4 dark:bg-black">
        <TextField
          label="lesson title"
          name="title"
          value={newItem.itemTitle}
          onChange={(e) => handleChangeForNewItem(e.target.value, 2)}
          placeholder="Enter your lesson title"
        />
        <Select
          label="topic level 2"
          name="selectedTopicL1"
          value={selectedTopics.L2}
          onClick={() => getTopicsFromL2(id)}
          onChange={(e) => insertNewItemTopicL2(e.target.value)}
        >
          <option value="">-- Select Topic --</option>
          {topicsL2.map((item) => (
            <option key={item.topic_id} value={item.topic_id}>
              {item.topic_title}
            </option>
          ))}
        </Select>
        {topicsLn.length > 0 && (
          <Select
            label="topic level 3"
            name="selectedTopicLn"
            value={selectedTopics.L3}
            onChange={(e) => insertNewItemTopicLn(e.target.value)}
          >
            <option value="">-- Select Topic --</option>
            {topicsLn.map((item) => (
              <option key={item.topic_id} value={item.topic_id}>
                {item.topic_title}
              </option>
            ))}
          </Select>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Button
          className="self-end"
          size="sm"
          variant="outlined"
          onClick={() => setStep(1)}
          type="button"
        >
          <Icon icon="mdi:chevron-left" fontSize={18} />
          Back
        </Button>
        <Button className="self-end" size="sm">
          <Icon icon="mdi:content-save-outline" fontSize={18} />
          Save
        </Button>
      </div>
    </>
  );

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        handlePostNewItem(e, toggleModal);
      }}
    >
      {step === 1 ? renderFirstStep : renderSecondStep}
    </form>
  );
};

// ______________________________
// TODO: components
const LessonType = ({ i, type, onClick, isSelected }) => {
  return (
    <div
      className="flex cursor-pointer flex-col items-center gap-2"
      onClick={onClick}
    >
      <div
        className={`rounded-lg shadow-lg transition-all duration-300 ease-in-out ${isSelected ? "bg-accent" : ""}`}
      >
        <Icon
          icon={i}
          fontSize={128}
          className={`${isSelected ? "text-white" : "text-accent"} transition-all duration-1000 ease-in-out`}
        />
      </div>
      <span className="text-xl font-medium text-accent">{type}</span>
    </div>
  );
};

export default NewItemModal;
