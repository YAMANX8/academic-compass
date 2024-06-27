import React from "react";
import { Icon } from "@iconify/react";

const NewTopic = ({ isOpen, onClose, onSave, selectedTopic, setSelectedTopic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">[MODAL_TITLE]</h2>
          <button onClick={onClose} className="text-red-500">
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">-- SELECT A TOPIC FROM L1 --</label>
          <input
            type="text"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter topic title"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onSave} className="flex items-center justify-center bg-primary-dark text-white px-4 py-2 rounded">
            <Icon icon="mdi:content-save" className="mr-2 h-[20px] w-[20px]" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTopic;
