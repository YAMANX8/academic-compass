import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline as InformationIcon } from "react-icons/io";
import { MdOutlineSecurity as SecurityIcon } from "react-icons/md";
import { BsPerson as Person } from "react-icons/bs";

import { General, Security, Account } from "../components/index";
import { LiaSaveSolid as Solid } from "react-icons/lia";

function Setting_Student() {
  const [formData, setFormData] = useState({
    firstName: "Yaman",
    lastName: "Jazzar",
    education: "",
    email: "",
    bio: "",
    birthDate: "",
    country: "",
    city: "",
    image: "",
    password: "",
    newPassword: "",
    verifyPassword: "",
  });
  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type == "file" ? (files[0] ? URL.createObjectURL(files[0]) : formData.image) : value,
      };
    });
    console.log([name], value);
  };
  const [selectedLink, setSelectedLink] = useState("general");
  const tabStyle =
    "p-[16px] w-[305px] gap-2 flex items-center rounded-[10px] tracking-tight hover:bg-blue-500 hover:text-light active:bg-accent";
  return (
    <form className="w-[1200px]">
      <h2 className="pb-[16px] font-semibold text-[48px] leading-l tracking-tight text-dark dark:text-light">
        Setting
      </h2>

      <div className="bg-secondary rounded-[10px] dark:bg-secondary-dark text-dark dark:text-light flex transition-all duration-1000 ease-in-out-back">
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

        <div className="p-8 flex flex-col gap-8 flex-1 ">
          {selectedLink === "general" && (
            <General
              country={formData.country}
              city={formData.city}
              image={formData.image}
              firstName={formData.firstName}
              lastName={formData.lastName}
              handleChange={handleChange}
            />
          )}
          {selectedLink === "security" && (
            <Security
              password={formData.password}
              newPassword={formData.newPassword}
              verifyPassword={formData.verifyPassword}
              handleChange={handleChange}
            />
          )}
          {selectedLink === "account" && (
            <Account
              firstName={formData.firstName}
              lastName={formData.lastName}
              education={formData.education}
              email={formData.email}
              bio={formData.bio}
              birthDate={formData.birthDate}
              handleChange={handleChange}
            />
          )}
          <button
            type="submit"
            className="self-end flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
          >
            Save Changes <Solid className="text-[25px]" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default Setting_Student;
