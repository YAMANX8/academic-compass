import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline as InformationIcon } from "react-icons/io";
import { MdOutlineSecurity as SecurityIcon } from "react-icons/md";
import { BsPerson as Person } from "react-icons/bs";

import { General, Security, Account, Button } from "../../../components";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import axios from "src/apis/axios";
import { useAuthContext } from "src/auth/hooks";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const SETTINGS_URL = "/student/setting";

function StudentSettings() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [selectedLink, setSelectedLink] = useState("general");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    education: "",
    birth_date: "",
    bio: "",
    country: "",
    city: "",
    currentPassword: "",
    newPassword: "",
    verifyNewPassword: "",
  });
  const [image, setImage] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      first_name: user.firstName == null ? "" : user.firstName,
      last_name: user.lastName == null ? "" : user.lastName,
      education: user.education == null ? "" : user.education,
      email: user.email == null ? "" : user.email,
      bio: user.bio == null ? "" : user.bio,
      birth_date: user.birthDate == null ? "" : user.birthDate,
      country: user.country == null ? "" : user.country,
      city: user.city == null ? "" : user.city,
    }));
    setImage(
      user.image == "http://localhost:5000/image/null" ? "" : user.image,
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    console.log([name], value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", image);
    for (const key in formData) formdata.append(key, formData[key]);
    try {
      const response = await axios.put(SETTINGS_URL, formdata, {
        headers: {
          token: user?.accessToken,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(0);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const tabStyle =
    "p-[16px] w-[305px] gap-2 flex items-center rounded-[10px] tracking-tight hover:bg-blue-500 hover:text-light active:bg-accent";
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <form className="w-[1200px]" onSubmit={handleSubmit}>
        <h2 className="pb-[16px] text-[48px] font-semibold leading-l tracking-tight text-dark dark:text-light">
          Settings
        </h2>

        <div className="flex rounded-[10px] bg-secondary text-dark transition-all duration-1000 ease-in-out-back dark:bg-secondary-dark dark:text-light">
          <ul className="flex flex-col gap-8 p-8">
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
          <div className="my-8 border-l border-r border-dark/10 dark:border-light/10"></div>

          <div className="flex flex-1 flex-col gap-8 p-8 ">
            {selectedLink === "general" && (
              <General
                country={formData.country}
                city={formData.city}
                image={image}
                firstName={formData.first_name}
                lastName={formData.last_name}
                handleChange={handleChange}
                setImage={setImage}
              />
            )}
            {selectedLink === "security" && (
              <Security
                password={formData.currentPassword}
                newPassword={formData.newPassword}
                verifyPassword={formData.verifyNewPassword}
                handleChange={handleChange}
              />
            )}
            {selectedLink === "account" && (
              <Account
                firstName={formData.first_name}
                lastName={formData.last_name}
                education={formData.education}
                email={formData.email}
                bio={formData.bio}
                birthDate={formData.birth_date}
                handleChange={handleChange}
              />
            )}
            <Button type="submit" className="self-end">
              Save Changes <Solid className="text-[25px]" />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default StudentSettings;
