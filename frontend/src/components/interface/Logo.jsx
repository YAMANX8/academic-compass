import React from "react";
import { Link } from "react-router-dom";
import { RouterLink } from "src/routes/components";
const Logo = React.forwardRef(({ disabledLink = false, className, ...other }, ref) => {
  const logo = (
    <img
      ref={ref}
      src="/logo.svg"
      className={`w-12 h-12 cursor-pointer ${className}`}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" className="inline-block">
      {logo}
    </Link>
  );
});

export default Logo;
