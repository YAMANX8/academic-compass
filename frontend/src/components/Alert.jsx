import { FaTimes as ESC } from "react-icons/fa";
import { useState } from "react";
const Alert = ({ state, text }) => {
  const [msg, setMsg] = useState(text);
  return (
    <div
      className={`flex justify-between items-center ${
        state ? "bg-green-400" : "bg-red-400"
      } py-4 px-8 mb-8 text-light font-bold text-xl ${
        msg ? "sticky top-[116px]" : "absolute -top-80"
      }`}
    >
      <p aria-live="assertive">{text}</p>
      <button
        onClick={() => {
          setMsg("");
        }}
      >
        <ESC />
      </button>
    </div>
  );
};

export default Alert;
