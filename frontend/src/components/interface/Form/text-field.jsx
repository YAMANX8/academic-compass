import { Icon } from "@iconify/react";
import { useState } from "react";

const TextField = ({
  label,
  name,
  helperText,
  type,
  size = "md",
  className = "",
  value,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const sizeClasses = {
    sm: "h-11",
    md: "h-14",
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative ${className}`}>
      <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-semibold text-gray-500 focus-within:text-dark dark:bg-black dark:text-gray-400">
        {label}
      </label>
      <input
        name={name}
        type={showPassword && showPasswordToggle ? "text" : type}
        value={type === "number" && value === 0 ? "" : value}
        className={`w-full rounded-lg border border-gray-400 bg-white px-3 text-sm placeholder:text-gray-400 hover:border-dark disabled:hover:border-gray-300 dark:bg-black ${sizeClasses[size]} focus:outline-none focus:ring-2 focus:ring-primary disabled:border-gray-300 disabled:text-gray-300`}
        {...props}
      />
      {type === "password" && showPasswordToggle && (
        <Icon
          icon={!showPassword ? "mdi:eye-off" : "mdi:eye"}
          fontSize={24}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500 dark:text-gray-400"
          onClick={handleTogglePassword}
        />
      )}
      {helperText && (
        <p
          className={`flex items-center gap-1 pl-3 pt-2 text-xs font-normal text-gray-500`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextField;
