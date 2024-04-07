import { Link } from "react-router-dom";
import { paths } from "../../routes/paths";
const Logo = (({ disabledLink = false, className, ...other }) => {
  const logo = (
    <img
      src="/logo/primary.png"
      className={`w-12 ${className}`}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link to={paths.main.root} className="inline-block">
      {logo}
    </Link>
  );
});

export default Logo;
