import React from "react";

const PerformanceCard = ({ title, color, count }) => {
  return (
    <div
      className={`rounded-[10px] px-4 py-3 border-t-[6px] leading-l tracking-tight ${color} transition-colors duration-1000 ease-in-out-back bg-light dark:bg-dark text-dark dark:text-light`}
    >
      <span className="text-[32px] font-bold mb-1">{count}</span>
      <p>{title}</p>
    </div>
  );
};

export default PerformanceCard;
