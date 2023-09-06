import { FaTimes as X } from "react-icons/fa";
const Modal = ({ isOpen, content, title, close }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 z-50 bg-dark/70">
      <div className="bg-light p-4 rounded-lg font-semibold text-dark text-[32px]">
        <div className="flex justify-between items-center mb-4">
          <p className="text-accent font-bold">{title}</p>
          <button
            onClick={close}
            className="flex text-[24px] justify-center items-center p-4 font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
          >
            <X />
          </button>
        </div>
        <div className="w-[700px] text-center overflow-auto p-4">{content}</div>
      </div>
    </div>
  );
};

export default Modal;
