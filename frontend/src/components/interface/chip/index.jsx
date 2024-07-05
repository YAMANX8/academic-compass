import React from "react";
import { Link } from "react-router-dom";
import { baseClasses, sizeClasses, variantColorClasses } from "./config";
const Chip = ({
  children,
  variant = "contained", // contained, outlined, text, soft
  size = "md", // sm, md, lg
  color = "primary", // primary, secondary, accent, success, info, warning, error
  className = "",
  ...props
}) => {

  // Construct the className string
  // TODO: Test to add VariantColorClasses that not contained.
  const style = `${baseClasses} ${sizeClasses[size]} ${variantColorClasses[variant][color]}  ${className}`;

 
  return (
    <span className={`${style}`} {...props}>
      {children}
    </span>
  );
};

export default Chip;
