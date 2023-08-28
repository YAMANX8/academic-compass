import React from 'react';

const PerformanceCard = ({ title, color, count }) => {
  return (
    <div
      className={`rounded-[10px] bg-light px-4 py-2 border-t-[6px] leading-[125%] tracking-tighter ${color}`}
    >
      <span className="text-dark text-[32px] font-bold mb-1">
        {count}
      </span>
      <p>
        {title}
      </p>
    </div>
  );
};

export default PerformanceCard;