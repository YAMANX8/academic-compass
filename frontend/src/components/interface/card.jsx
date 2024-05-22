import React from "react";

const Card = ({ children, className = "", title }) => {
  return (
    <div className={`rounded-lg px-4 py-6 shadow-lg bg-white dark:bg-black ${className}`}>
      {title && <h3 className="mb-2 w-full">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
