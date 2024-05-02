import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { Logo } from "../../components";
import { CiLogin as Login } from "react-icons/ci";
import { AiOutlineSearch as Search } from "react-icons/ai";
import { BsPerson as Person } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Switcher, Button } from "../../components";
import { paths } from "../../routes/paths";
import { useAuthContext } from "../../auth/hooks";
const Header = () => {
  const { authenticated, logout, user } = useAuthContext();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${paths.main.search.byText}/${search}`, {
      state: { byText: true },
    });
  };
  const handleLogout = () => {
    logout();
    setConfirmLogout(false); // لإغلاق النافذة
    setIsOpen(false);
  };
  const userInfo = {
    firstName: user?.first_name == null ? "user" : user?.first_name,
    lastName: user?.last_name == null ? "" : user?.last_name,
    imagePath:
      user?.picture == "http://localhost:5000/image/null" ? "" : user?.picture,
  };
  const btnStyle =
    "px-[20px] py-[10px] rounded-[5px] font-semibold	gap-[10px] items-center text-[16px]";
  const meunItemStyle =
    "cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 active:bg-accent active:text-light";
  return (
    <nav className=" sticky top-0 z-50 flex w-full justify-between bg-light px-[120px]  py-4 text-dark shadow-[0_0_20px_rgba(0,0,0)] transition-colors duration-1000 ease-in-out-back dark:bg-dark dark:text-light">
      <div>
        <Logo className="w-[150px]" />
      </div>
      <div className="flex items-center gap-[16px]">
        <form
          onSubmit={handleSubmit}
          className="relative flex w-11 rounded-full text-dark transition-all duration-1000 ease-in-out-back focus-within:w-[250px] focus-within:bg-secondary dark:text-light dark:focus-within:bg-secondary-dark"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="z-10 w-full rounded-full bg-transparent py-[10px] pl-9 pr-[10px] outline-none"
          />
          <Search className="absolute left-[10px] top-[10px] text-[24px] font-semibold" />
        </form>
        <Button variant="text" page={paths.roadmaps} className="!text-dark">
          Roadmaps{" "}
        </Button>
        <Button variant="text" page={paths.main.others} className="!text-dark">
          Become part of Academic compass
        </Button>
        {!authenticated ? (
          <>
            <Button variant="outlined" page={paths.auth.student.login}>
              <Login size={24} />
              Log in
            </Button>
            <Button page={paths.auth.student.register}>
              <Person size={24} />
              Sign up
            </Button>
          </>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="w-[1px] self-stretch rounded-full bg-dark transition-all duration-1000 ease-in-out-back dark:bg-light"></div>
            <Link
              to={
                user.role_id == 2 ? paths.student.root : paths.instructor.root
              }
              className="flex aspect-square w-[45px] items-center justify-center overflow-clip rounded-full bg-primary text-light"
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
            <p className="font-semibold tracking-tight text-primary transition-all duration-1000 ease-in-out-back dark:text-accent-dark">
              {userInfo.firstName} {userInfo.lastName}
            </p>

            {/* menu */}
            <div className="relative text-center">
              <div>
                <Button
                  type="button"
                  size="sm"
                  variant="text"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <BiChevronUp className="text-[24px] text-dark" />
                  ) : (
                    <BiChevronDown className="text-[24px] text-dark" />
                  )}
                </Button>
              </div>

              {isOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-md bg-secondary text-dark shadow-lg ring-1 ring-dark/20 transition-all duration-1000 ease-in-out-back  focus:outline-none dark:bg-secondary-dark dark:text-light dark:ring-light/20`}
                >
                  <ul className="py-1">
                    <li
                      className={`${meunItemStyle}`}
                      onClick={() => {
                        if (user.role_id == 2) navigate(paths.student.settings);
                        else navigate(paths.instructor.settings);
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
                      <ul className="mt-2 border-t border-dark/20 pt-2 dark:border-light/20">
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

export default Header;
