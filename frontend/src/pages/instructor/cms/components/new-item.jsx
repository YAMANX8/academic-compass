import React, { useState } from "react";
import { Icon } from "@iconify/react";

const NewItem = ({ isOpen, onClose, onAddItem, setSelectedItemType }) => {
  const [selectedItemTypeLocal, setSelectedItemTypeLocal] = useState(null);
  const [step, setStep] = useState(1);
  const [lessonName, setLessonName] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (selectedItemTypeLocal && lessonName && selectedTopic) {
      setSelectedItemType(selectedItemTypeLocal);
      onAddItem(lessonName, selectedTopic);
      onClose();
      setSelectedItemTypeLocal(null);
      setStep(1);
      setLessonName("");
      setSelectedTopic("");
    }
  };

  const icons = {
    Video: "mdi:file-video-outline",
    Article: "mdi:file-document-outline",
    Quiz: "mdi:help-circle-outline",
    Code: "mdi:file-code-outline",
  };

  const topics = [
    "TOPIC TITLE 1",
    "TOPIC TITLE 2",
    "TOPIC TITLE 3",
    "TOPIC TITLE 4",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded bg-secondary-light p-4 shadow-lg">
        {step === 1 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">[MODAL_TITLE]</h2>
              <button onClick={onClose} className="text-error">
                <div className="rounded-full bg-white p-1">
                  <Icon icon="mdi:close" className="h-6 w-6" />
                </div>
              </button>
            </div>
            <div className="rounded bg-secondary-lighter p-4 shadow-md">
              <div className="flex items-center justify-around gap-4">
                {["Video", "Article", "Quiz", "Code"].map((itemType) => (
                  <div
                    key={itemType}
                    className={`rounded-lg p-4 shadow-md ${
                      selectedItemTypeLocal === itemType
                        ? "bg-purple-700 text-white"
                        : "bg-white text-purple-600"
                    }`}
                  >
                    <button
                      className="flex cursor-pointer flex-col items-center justify-center rounded p-4 transition-shadow hover:shadow-lg"
                      onClick={() => setSelectedItemTypeLocal(itemType)}
                    >
                      <Icon icon={icons[itemType]} className="mb-2 h-16 w-16" />
                      <span className="text-lg font-semibold">{itemType}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center justify-center rounded bg-primary-dark px-4 py-2 text-white"
              >
                Next
                <Icon
                  icon="mdi:chevron-right"
                  className="ml-2 h-[20px] w-[20px]"
                />
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="mb-4 flex items-center justify-between w-[416px]">
              <h2 className="text-xl font-bold">[MODAL_TITLE]</h2>
              <button onClick={onClose} className="text-error">
                <div className="rounded-full bg-white p-1">
                  <Icon icon="mdi:close" className="h-6 w-6" />
                </div>
              </button>
            </div>
            <div className="mb-4">
              <label className="mb-2 block">lesson name</label>
              <input
                type="text"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                className="w-full rounded border p-2"
                placeholder="[LESSON_NAME]"
              />
            </div>
            <div className="mb-4">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full rounded border p-2"
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddItem}
                className="flex items-center justify-center rounded bg-primary-dark px-4 py-2 text-white"
              >
                <Icon
                  icon="mdi:content-save"
                  className="mr-2 h-[20px] w-[20px]"
                />
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewItem;
