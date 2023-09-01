import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline as InformationIcon } from "react-icons/io";
import { MdOutlineSecurity as SecurityIcon } from "react-icons/md";
import { BsPerson as Person } from "react-icons/bs";

import { General, Security, Account } from "../components/index";

function Setting_Student() {
  const [selectedLink, setSelectedLink] = useState("general");
  const tabStyle =
    "p-[16px] w-[305px] gap-2 flex items-center rounded-[10px] tracking-tight hover:bg-blue-500 hover:text-light active:bg-accent";
  return (
    <div className="w-[1200px]">
      <h2 className="pb-[16px] font-semibold text-[48px] leading-l tracking-tight text-dark dark:text-light">
        Setting
      </h2>

      <div className="bg-secondary flex">
        <ul className="p-8 flex flex-col gap-8">
          <li>
            <Link
              className={`${tabStyle} ${
                selectedLink === "general" &&
                "bg-primary text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedLink("general")}
            >
              <InformationIcon className="text-3xl" />
              <span className="text-[24px]">General Information</span>
            </Link>
          </li>

          <li>
            <Link
              className={`${tabStyle} ${
                selectedLink === "security" &&
                "bg-primary text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedLink("security")}
            >
              <SecurityIcon className="text-3xl" />
              <span className="text-[24px]">Security</span>
            </Link>
          </li>

          <li>
            <Link
              className={`${tabStyle} ${
                selectedLink === "account" &&
                "bg-primary text-white hover:bg-primary"
              }`}
              onClick={() => setSelectedLink("account")}
            >
              <Person className="text-3xl" />
              <span className="text-[24px]">Account</span>
            </Link>
          </li>
        </ul>

        {/* line */}
        <div className="border-l border-r border-dark/10 dark:border-light/10 my-8"></div>

        {selectedLink === "general" && <General />}
        {selectedLink === "security" && <Security />}
        {selectedLink === "account" && <Account />}
      </div>
    </div>
  );
}

export default Setting_Student;
