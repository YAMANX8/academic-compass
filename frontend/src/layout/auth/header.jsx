import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import { Logo } from "../../components";
import { CiLogin as Login } from "react-icons/ci";
import { AiOutlineSearch as Search } from "react-icons/ai";
import { BsPerson as Person } from "react-icons/bs";
import { Switcher, Button } from "../../components";
import { paths } from "../../routes/paths";
const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`${paths.main.search.byText}/${search}`, {
      state: { byText: true },
    });
  };

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

        <Button variant="outlined" page={paths.auth.student.login}>
          <Login size={24} />
          Log in
        </Button>
        <Button page={paths.auth.student.register}>
          <Person size={24} />
          Sign up
        </Button>

        <Switcher />
      </div>
    </nav>
  );
};

export default Header;
