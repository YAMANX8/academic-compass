import React, { useState, useEffect } from "react";
import axios from "../../apis/axios";
import toast, { Toaster } from "react-hot-toast";
import { LiaSaveSolid as Solid } from "react-icons/lia";

//styles
const inputStyle =
  "p-[10px] rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-dark/50 dark:border-light/50 text-[20px] transition-all duration-1000 ease-in-out-back";
const labelStyle = "font-medium text-[22px] leading-l";

const Account = ({
  firstName,
  lastName,
  education,
  email,
  bio,
  birthDate,
  handleChange,
}) => {
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
              name="first_name"
              className={`${inputStyle}`}
              type="text"
              placeholder="Jone"
              value={firstName}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="lastName" className={`${labelStyle}`}>
              Last Name
            </label>
            <input
              id="lastName"
              name="last_name"
              className={`${inputStyle}`}
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2 col-span-1 ">
            <label htmlFor="education" className={`${labelStyle}`}>
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
            <label htmlFor="email" className={`${labelStyle}`}>
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
            <label htmlFor="birthDate" className={`${labelStyle}`}>
              Birth of Date
            </label>
            <input
              id="birthDate"
              name="birth_date"
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
