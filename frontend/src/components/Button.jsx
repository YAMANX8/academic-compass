import { Link } from "react-router-dom";
const Button = ({ children, page }) => {
  return (
    <Link
      to={page}
      className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
    >
      {children}
    </Link>
  );
};

export default Button;
