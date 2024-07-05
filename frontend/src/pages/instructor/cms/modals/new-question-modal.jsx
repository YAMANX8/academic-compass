import React, { useState, useEffect } from "react";
import { TextField, Button } from "../../../../components";
import { Icon } from "@iconify/react";
import { useCmsContext } from "../../../../context/hooks/use-cms-context";
const NewQuestionModal = ({ itemId, toggleModal, flag }) => {
  // TODO: states
  const { newQuestion, handleChangeNewQuestion, handlePostQuestion } =
    useCmsContext();
  // TODO: functions
  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    handleChangeNewQuestion(value, name, index);
  };
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        // handleNewQuestion(data);
        if (flag == 0) handlePostQuestion(11, itemId);
        if (flag == 1) console.log("edit flag");
        toggleModal();
      }}
    >
      <div className="w-96 space-y-5 rounded bg-white p-4 dark:bg-black">
        <div>
          <TextField
            name="question_body"
            value={newQuestion.question_body}
            label="question body"
            placeholder="what is the question?"
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-3">
          {newQuestion.options.map((option, i) => (
            <label htmlFor="is_correct" className="flex gap-2" key={i}>
              <input
                type="radio"
                name="is_correct"
                checked={option.is_correct}
                onChange={(e) => handleInputChange(e, i)}
              />
              <TextField
                name="option_body"
                value={option.option_body}
                label={`option ${i + 1}`}
                className="flex-1"
                placeholder="what is the option?"
                onChange={(e) => handleInputChange(e, i)}
              />
            </label>
          ))}
        </div>
        <div>
          <TextField
            name="question_points"
            value={newQuestion.question_points}
            label="question points"
            type="number"
            className="w-40"
            placeholder="Marks"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <Button className="self-end" size="sm">
        <Icon icon="mdi:content-save-outline" fontSize={18} />
        Save
      </Button>
    </form>
  );
};

export default NewQuestionModal;
