import React from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { Button } from "../index";
const Modal = ({ isOpen, children, onClose, title }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col gap-4 rounded-lg bg-light p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-dark">{title}</span>
          <Button onClick={onClose} variant="text" size="sm" color="error">
            <Icon icon="mdi:close-circle-outline" fontSize={20} />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
