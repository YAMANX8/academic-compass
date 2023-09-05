import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import { CiLogin as Login } from "react-icons/ci";
import { AiOutlineSearch as Search } from "react-icons/ai";
import {
  BsPerson as Person,
  BsMoon as Moon,
  BsSun as Sun,
} from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { Switcher } from "./index";
import useAuth from "../hooks/useAuth";
import Img from "../assets/images/profile.png";

const Navbar = () => {
  const { isAuth } = useAuth();
  const userInfo = {
    firstName: "Yaman",
    lastName: "Al-Jazzar",
    imagePath: Img,
  };
  const btnStyle =
    "px-[20px] py-[10px] rounded-[5px] font-semibold	gap-[10px] items-center text-[16px]";

  return (
    <nav className=" px-[120px] py-[28px] flex justify-between transition-colors duration-1000 ease-in-out-back text-dark  dark:text-light bg-light dark:bg-dark shadow-[0_0_20px_rgba(0,0,0)] sticky w-full top-0 z-50">
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
        <Link to="/student/roadmaps" className="font-semibold">
          Roadmaps{" "}
        </Link>
        <Link to="/instructor/register" className="font-semibold">
          Teach on Academic compass
        </Link>
        {!isAuth ? (
          <>
            <Link
              to="/student/login"
              className={`flex bg-light text-primary border-primary border-[1px] border-solid ${btnStyle}`}
            >
              <Login className="text-[24px]" />
              Log in
            </Link>
            <Link
              to="/student/register"
              className={`flex bg-primary text-light ${btnStyle}`}
            >
              <Person className="text-[24px]" />
              Sign up
            </Link>
          </>
        ) : (
          <div className="flex justify-between gap-4 items-center">
            <div className="w-[1px] bg-dark dark:bg-light self-stretch transition-all duration-1000 ease-in-out-back rounded-full"></div>
            <Link to='/student/dashboard' className="flex justify-center items-center w-[45px] overflow-clip aspect-square rounded-full bg-primary text-light">
              {userInfo.imagePath  ? (
                <img src={userInfo.imagePath} className="object-cover" alt="profile picture" />
              ) : (
                <span>{userInfo.firstName.charAt(0)} {userInfo.lastName.charAt(0)}</span>
              )}
            </Link>
            <p className="font-semibold tracking-tight text-primary dark:text-accent-dark transition-all duration-1000 ease-in-out-back">
              {userInfo.firstName} {userInfo.lastName}
            </p>
            <BiChevronDown className="text-[24px]"/>
          </div>
        )}
        <Switcher />
      </div>
    </nav>
  );
};

export default Navbar;
