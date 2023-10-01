import { useState } from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import { BsEyeSlash as Hide, BsEye as Show } from "react-icons/bs";
import axios from "../../apis/axios";
//styles
const inputStyle =
  "p-[10px] pr-[50px] rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-dark/50 dark:border-light/50 text-[20px] transition-all duration-1000 ease-in-out-back";

const Security = ({ password, newPassword, verifyPassword, handleChange }) => {
  const [isOldVisible, setIsOldVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isMatchVisible, setIsMatchVisible] = useState(false);
  return (
    <>
      <h3 className="text-[32px] tracking-tight font-semibold">Security</h3>
      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">
          Password
        </h4>
        <div className="grid gap-4 grid-cols-2">
          <div className="grid gap-2 relative">
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
              type={isOldVisible ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-0 top-12 flex items-center px-4 text-gray-600"
              onClick={() => setIsOldVisible((prev) => !prev)}
            >
              {isOldVisible ? <Show size={25} /> : <Hide size={25} />}
            </button>
          </div>
          <div className="grid gap-2 relative">
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
              type={isNewVisible ? "text" : "password"}
              placeholder="********"
              value={newPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-0 top-12 flex items-center px-4 text-gray-600"
              onClick={() => setIsNewVisible((prev) => !prev)}
            >
              {isNewVisible ? <Show size={25} /> : <Hide size={25} />}
            </button>
          </div>
          <div className="grid gap-2 col-span-1 relative">
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
              type={isMatchVisible ? "text" : "password"}
              placeholder="********"
              value={verifyPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-0 top-12 flex items-center px-4 text-gray-600"
              onClick={() => setIsMatchVisible((prev) => !prev)}
            >
              {isMatchVisible ? <Show size={25} /> : <Hide size={25} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
