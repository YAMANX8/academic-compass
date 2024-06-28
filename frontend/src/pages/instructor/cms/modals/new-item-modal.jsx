import React, { useState, useEffect } from "react";
import { Select, TextField, Button } from "../../../../components";
import { Icon } from "@iconify/react";

const types = [
  {
    id: 1,
    type: "video",
    icon: "mdi:file-video-outline",
  },
  {
    id: 2,
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

const NewItemModal = ({ id }) => {
  // TODO: states
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    title: "",
    type: "",
    topicL2: [
      { id: 0, title: "HTML Basics" },
      { id: 1, title: "HTML tags" },
    ],
    topicLn: [
      { id: 0, title: "test1" },
      { id: 1, title: "test2" },
    ],
    selectedTopicL2: "",
    selectedTopicLn: "",
  });
  console.table(data);
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
            onClick={() => setData({ ...data, type: type.type })}
            isSelected={data.type === type.type}
          />
        ))}
      </div>
      <Button
        className="self-end"
        size="sm"
        type="button"
        onClick={() => setStep(2)}
        disabled={!data.type}
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
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Enter your lesson title"
        />
        <Select
          label="topic level 2"
          name="selectedTopicL1"
          value={data.selectedTopicL2}
          onChange={(e) =>
            setData({
              ...data,
              selectedTopicL2: e.target.value,
              selectedTopicLn: "",
            })
          }
        >
          <option value="">-- Select Topic --</option>
          {data.topicL2.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
        {data.selectedTopicL2 && (
          <Select
            label="topic level 3"
            name="selectedTopicLn"
            value={data.selectedTopicLn}
            onChange={(e) =>
              setData({ ...data, selectedTopicLn: e.target.value })
            }
          >
            <option value="">-- Select Topic --</option>
            {data.topicLn.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
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
    <form className="flex flex-col gap-4">
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
