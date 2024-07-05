import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button, Chip } from "../../../../../components";
import NewQuestionModal from "../../modals/new-question-modal";
import { useCmsContext } from "../../../../../context/hooks/use-cms-context";
const Quiz = ({ itemId, setModalContent, toggleModal }) => {
  // TODO: states
  const { quiz, handleDeleteQuestion, handleGetQuestion } = useCmsContext();
  // TODO: functions
  const toggleEditQuestionModal = async (id) => {
    await handleGetQuestion(id);
    toggleModal();
    setModalContent(
      <NewQuestionModal toggleModal={toggleModal} flag={1} itemId={itemId} />,
    );
  };
  const toggleNewQuestionModal = () => {
    toggleModal();
    setModalContent(
      <NewQuestionModal toggleModal={toggleModal} flag={0} itemId={itemId} />,
    );
  };
  return (
    <div className="space-y-1 bg-white dark:bg-black p-2">
      {quiz.map((question) => (
        <div
          className="flex items-center justify-between"
          key={question.question_id}
        >
          <p>{question.question_body}</p>
          <div className="flex items-center gap-2">
            <Button
              variant="soft"
              size="sm"
              color="error"
              onClick={() => handleDeleteQuestion(question.question_id, itemId)}
            >
              <Icon icon="mdi:trash-can-outline" />
            </Button>
            <Button
              variant="soft"
              size="sm"
              color="accent"
              onClick={() => toggleEditQuestionModal(question.question_id)}
            >
              <Icon icon="mdi:pencil" />
            </Button>
            <Chip size="sm" variant="soft" color="success">
              {question.question_points}
            </Chip>
          </div>
        </div>
      ))}
      <Button
        variant="soft"
        size="sm"
        color="accent"
        onClick={toggleNewQuestionModal}
      >
        <Icon icon="mdi:plus" />
        New question
      </Button>
    </div>
  );
};

export default Quiz;
