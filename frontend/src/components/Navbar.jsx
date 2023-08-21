import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import { CiLogin as Login } from "react-icons/ci";
import { AiOutlineSearch as Search } from "react-icons/ai";
import {
  BsPerson as Person,
  BsMoon as Moon,
  BsSun as Sun,
} from "react-icons/bs";
const toggleDark = () => {};

const Navbar = () => {
  const btnStyle =
    "px-[20px] py-[10px] rounded-[5px] font-semibold	gap-[10px] items-center text-[16px]";
    
  return (
    <nav className=" px-[120px] py-[28px] flex justify-between bg-light dark:bg-dark text-dark dark:text-light shadow-[0_0_20px_rgba(0,0,0)] fixed w-full top-0">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[203px]" />
        </Link>
      </div>
      <div className="flex gap-[16px] items-center">
        <div className="flex relative">
          <input
            type=""
            className="w-[150px] py-[10px] rounded-full bg-transparent z-10 cursor-pointer"
          />
          <Search className="font-semibold absolute right-[10px] top-[10px] text-[24px]" />
        </div>
        <Link to="/roadmaps" className="font-semibold">
          Roadmaps{" "}
        </Link>
        <Link to="/register-instructor " className="font-semibold">
          Teach on Academic compass
        </Link>
        <Link
          to="/login-student"
          className={`flex bg-light text-primary border-primary border-[1px] border-solid ${btnStyle}`}
        >
          <Login className="text-[24px]" />
          Log in
        </Link>
        <Link
          to="/register-student"
          className={`flex bg-primary text-light ${btnStyle}`}
        >
          <Person className="text-[24px]" />
          Sign up
        </Link>
        <Sun className="text-[24px] cursor-pointer" onClick={toggleDark} />
      </div>
    </nav>
  );
};

export default Navbar;
