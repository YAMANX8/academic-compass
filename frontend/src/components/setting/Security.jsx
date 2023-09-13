import { useState } from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import axios from "../../apis/axios";
//styles
const inputStyle =
  "p-[10px] rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-dark/50 dark:border-light/50 text-[20px] transition-all duration-1000 ease-in-out-back";

const Security = ({ password, newPassword, verifyPassword, handleChange }) => {
  return (
    <>
      <h3 className="text-[32px] tracking-tight font-semibold">Security</h3>
      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">
          Password
        </h4>
        <div className="grid gap-4 grid-cols-2">
          <div className="grid gap-2">
            <label
              htmlFor="country"
              className="font-medium text-[22px] leading-l"
            >
              Your current password
            </label>
            <input
              id="country"
              name="currentPassword"
              className={`${inputStyle}`}
              type="password"
              placeholder="********"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="newPassword"
              className="font-medium text-[22px] leading-l"
            >
              New password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              className={`${inputStyle}`}
              type="password"
              placeholder="********"
              value={newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2 col-span-1 ">
            <label
              htmlFor="verifyNewPassword"
              className="font-medium text-[22px] leading-l"
            >
              Verify new password
            </label>
            <input
              id="verifyNewPassword"
              name="verifyNewPassword"
              className={`${inputStyle}`}
              type="password"
              placeholder="********"
              value={verifyPassword}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
