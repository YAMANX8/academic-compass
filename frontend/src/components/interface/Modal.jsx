import { FaTimes as X } from "react-icons/fa";
import { Button } from "../index";
const Modal = ({ isOpen, content, title, close }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-dark/70">
      <div className="rounded-lg bg-light p-4 text-[32px] font-semibold text-dark">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-bold text-accent">{title}</p>
          <Button color="error" size="sm" onClick={close}>
            <X />
          </Button>
        </div>
        <div className="w-[700px] overflow-auto p-4 text-center">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
