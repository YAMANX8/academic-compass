import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import Logo from "/logo.svg";
import { CiLogin as Login } from "react-icons/ci";
import { AiOutlineSearch as Search } from "react-icons/ai";
import {
  BsPerson as Person,
  BsMoon as Moon,
  BsSun as Sun,
} from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Switcher } from "../index";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { auth, setAuth, isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/student/search/by-text/${search}`, { state: { byText: true } });
  };
  const handleLogout = () => {
    // إزالة الرمز من المتصفح
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // إعادة تعيين حالة المصادقة
    setIsAuth(false);
    setAuth({});
    setConfirmLogout(false); // لإغلاق النافذة
    setIsOpen(false);
    toast("Logout Successfully");
    navigate("/");
  };
  const userInfo = {
    firstName: auth.firstName == null ? "" : auth.firstName,
    lastName: auth.lastName == null ? "" : auth.lastName,
    imagePath:
      auth.image == "http://localhost:5000/image/null" ? "" : auth.image,
  };
  const btnStyle =
    "px-[20px] py-[10px] rounded-[5px] font-semibold	gap-[10px] items-center text-[16px]";
  const meunItemStyle =
    "cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 active:bg-accent active:text-light";
  return (
    <nav className=" px-[120px] py-[28px] flex justify-between transition-colors duration-1000 ease-in-out-back text-dark  dark:text-light bg-light dark:bg-dark shadow-[0_0_20px_rgba(0,0,0)] sticky w-full top-0 z-50">
      <div>
        <Link to="/">
          <img src={Logo} alt="logo" className="w-[203px]" />
        </Link>
      </div>
      <div className="flex gap-[16px] items-center">
        <form
          onSubmit={handleSubmit}
          className="flex relative rounded-full w-11 focus-within:w-[250px] focus-within:bg-secondary dark:focus-within:bg-secondary-dark transition-all duration-1000 ease-in-out-back text-dark dark:text-light"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="w-full py-[10px] pl-9 pr-[10px] rounded-full bg-transparent outline-none z-10"
          />
          <Search className="font-semibold absolute left-[10px] top-[10px] text-[24px]" />
        </form>
        <Link to="/student/roadmaps" className="font-semibold">
          Roadmaps{" "}
        </Link>
        <Link to="/instructor/register" className="font-semibold">
        Become part of Academic compass
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
            <Link
              to="/student/dashboard"
              className="flex justify-center items-center w-[45px] overflow-clip aspect-square rounded-full bg-primary text-light"
            >
              {userInfo.imagePath ? (
                <img
                  src={userInfo.imagePath}
                  className="object-cover"
                  alt="profile picture"
                />
              ) : (
                <span>
                  {userInfo.firstName.charAt(0)} {userInfo.lastName.charAt(0)}
                </span>
              )}
            </Link>
            <p className="font-semibold tracking-tight text-primary dark:text-accent-dark transition-all duration-1000 ease-in-out-back">
              {userInfo.firstName} {userInfo.lastName}
            </p>

            {/* menu */}
            <div className="relative text-center">
              <div>
                <button
                  type="button"
                  className="w-full rounded-[10px] px-4 py-2  text-sm font-medium  hover:bg-secondary dark:hover:bg-secondary-dark focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <BiChevronUp className="text-[24px]" />
                  ) : (
                    <BiChevronDown className="text-[24px]" />
                  )}
                </button>
              </div>

              {isOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg text-dark dark:text-light bg-secondary dark:bg-secondary-dark ring-1 ring-dark/20 dark:ring-light/20  focus:outline-none transition-all duration-1000 ease-in-out-back`}
                >
                  <ul className="py-1">
                    <li
                      className={`${meunItemStyle}`}
                      onClick={() => {
                        navigate("/student/settings");
                        setIsOpen(false);
                      }}
                    >
                      Settings
                    </li>

                    <li
                      className={`${meunItemStyle}`}
                      onClick={() => setConfirmLogout(true)}
                    >
                      Log Out
                    </li>

                    {confirmLogout && (
                      <ul className="border-t border-dark/20 dark:border-light/20 mt-2 pt-2">
                        <li
                          className={`${meunItemStyle} text-red-500`}
                          onClick={handleLogout}
                        >
                          Yes, Log Out
                        </li>

                        <li
                          className={`${meunItemStyle}`}
                          onClick={() => setConfirmLogout(false)}
                        >
                          No, Stay Logged In
                        </li>
                      </ul>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        <Switcher />
      </div>
    </nav>
  );
};

export default Navbar;
