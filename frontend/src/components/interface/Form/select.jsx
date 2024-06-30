import { useState } from "react";
import { Icon } from "@iconify/react";

const Select = ({ label, size = "md", className = "", children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "h-11",
    md: "h-14",
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="absolute -top-2 left-2 z-10 bg-white px-1 text-xs font-semibold text-gray-500 focus-within:text-dark dark:bg-black dark:text-gray-400">
        {label}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-lg border border-gray-400 bg-white px-3 text-sm text-dark placeholder:text-gray-400 hover:border-dark disabled:hover:border-gray-300 dark:bg-black ${sizeClasses[size]} focus:outline-none focus:ring-2 focus:ring-primary disabled:border-gray-300 disabled:text-gray-300`}
          onClick={handleToggle}
          {...props}
        >
          {children}
        </select>
        <Icon
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-dark"
          fontSize={24}
        />
      </div>
    </div>
  );
};

export default Select;
