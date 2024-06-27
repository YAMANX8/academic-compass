import { Modal2 } from "../components";
import React, { useState } from "react";

const Test = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <div>
      <button onClick={toggleModal}>Open Modal</button>
      <Modal2 title="[MODAL_TITLE]" isOpen={isModalOpen} onClose={toggleModal}>
        <h2>Modal Title</h2>
        <p>This is the content inside the modal.</p>
      </Modal2>
    </div>
  );
};

export default Test;
