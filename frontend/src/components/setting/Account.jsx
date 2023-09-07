import React, { useState, useEffect } from "react";
import axios from "../../apis/axios";
import toast, { Toaster } from "react-hot-toast";
import { LiaSaveSolid as Solid } from "react-icons/lia";

//styles
const inputStyle =
  "p-[10px] rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-dark/50 dark:border-light/50 text-[20px] transition-all duration-1000 ease-in-out-back";
const labelStyle = "font-medium text-[22px] leading-l";
// const GET_INFO_URL = "/studentDashboard/update-account/getInfo";

const Account = ({
  firstName,
  lastName,
  education,
  email,
  bio,
  birthDate,
  handleChange,
}) => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [education, setEducation] = useState('');
  // const [email, setEmail] = useState('');
  // const [bio, setBio] = useState('');
  // const [birthDate, setBirthDate] = useState('');

  // useEffect(() => {
  //   const fetchStudentInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         GET_INFO_URL ,
  //         JSON.stringify(
  //           { first_name : firstName, last_name:lastName, email, education, birth_date :birthDate, bio }),
  //       {
  //         headers: {
  //           token: localStorage.token,
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log(response.data);

  //       if (response.data && response.data.Data && response.data.Data.data && response.data.Data.data.length) {
  //         const studentData = response.data.Data.data[0];
  //         setFirstName(studentData.first_name);
  //         setLastName(studentData.last_name);
  //         setEmail(studentData.email);
  //         setEducation(studentData.education);
  //         setBio(studentData.bio);
  //         setBirthDate(studentData.birth_date);  console.log(response.data);
  //       }
  //     } catch (error) {
  //       toast.error("Failed to fetch student information.");
  //     }
  //   };

  //   fetchStudentInfo();
  // }, []);

  return (
    <>
      <h3 className="text-[32px] tracking-tight font-semibold">Account</h3>
      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">
          Profile
        </h4>
        <div className="grid gap-4 grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="firstName" className={`${labelStyle}`}>
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              className={`${inputStyle}`}
              type="text"
              placeholder="Jone"
              value={firstName}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="lastName"
              className={`${labelStyle}`}
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              className={`${inputStyle}`}
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 col-span-1 ">
            <label
              htmlFor="education"
              className={`${labelStyle}`}
            >
              Education
            </label>
            <input
              id="education"
              name="education"
              className={`${inputStyle}`}
              type="text"
              placeholder="BC in software engineering"
              value={education}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 col-span-1 ">
            <label
              htmlFor="email"
              className={`${labelStyle}`}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              className={`${inputStyle}`}
              type="email"
              placeholder="something@anything.com"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 col-span-1 ">
            <label htmlFor="bio" className={`${labelStyle}`}>
              Bio
            </label>
            <input
              id="bio"
              name="bio"
              className={`${inputStyle}`}
              type="text"
              placeholder="A patinate software engineer student"
              value={bio}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 col-span-1 ">
            <label
              htmlFor="birthDate"
              className={`${labelStyle}`}
            >
              Birth of Date
            </label>
            <input
              id="birthDate"
              name="birthDate"
              className={`${inputStyle} dark:[color-scheme:dark]`}
              type="date"
              placeholder="22-8-2023"
              value={birthDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
