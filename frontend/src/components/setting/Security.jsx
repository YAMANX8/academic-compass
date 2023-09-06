import { useState } from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import axios from "../../apis/axios";
import toast, { Toaster } from "react-hot-toast";
//styles
const inputStyle =
  "p-[10px] rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-dark/50 dark:border-light/50 text-[20px] transition-all duration-1000 ease-in-out-back";

// const SECURITY_URL = "/studentDashboard/change-password";

const Security = ({ password, newPassword, verifyPassword, handleChange }) => {
  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [verifyNewPassword, setVerifyNewPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.put(
  //       SECURITY_URL,
  //       JSON.stringify({ currentPassword, newPassword, verifyNewPassword }),
  //       {
  //         headers: {
  //           token: localStorage.token,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     toast.success(res.data.message);
  //   } catch (err) {
  //     if (!err?.response) {
  //       toast.error("No Server Response");
  //     } else if (err.response?.status === 401) {
  //       toast.error(err.response.data.message);
  //     } else if (err.response?.status === 400) {
  //       toast.error(err.response.data.message);
  //     } else if (err.response?.status === 404) {
  //       toast.error(err.response.data.message);
  //     } else {
  //       toast.error("Login Failed");
  //     }
  //   }
  // };
  // console.log(currentPassword);
  return (
    <>
      <div>
        <Toaster />
      </div>
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
              name="password"
              className={`${inputStyle}`}
              type="password"
              placeholder="**********"
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
              name="verifyPassword"
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
