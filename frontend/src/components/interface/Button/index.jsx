import React from "react";
import { Link } from "react-router-dom";
import { baseClasses, sizeClasses, variantColorClasses } from "./config";
const Button = ({
  children,
  variant = "contained", // contained, outlined, text, soft
  size = "md", // sm, md, lg
  color = "primary", // primary, secondary, accent, success, info, warning, error
  disabled = false,
  page = "", // If provided, renders as a Link, otherwise as a button
  className = "",
  ...props
}) => {
  // Disabled classes
  const disabledClasses = disabled ? "cursor-not-allowed opacity-50" : "";

  // Construct the className string
  // TODO: Test to add VariantColorClasses that not contained.
  const style = `${baseClasses} ${sizeClasses[size]} ${variantColorClasses[variant][color]} ${disabledClasses}`;

  // Conditionally render as a Link or button
  const component = page ? "Link" : "button";

  if (component == "Link")
    return (
      <Link
        to={page}
        disabled={disabled}
        className={`${style} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  return (
    <button className={`${style} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
