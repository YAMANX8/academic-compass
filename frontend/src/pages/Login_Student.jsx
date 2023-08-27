import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
import {SignInUpWrapper } from "../layout";
import { useRef, useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";

import axios from "../apis/axios";

function Login_Student() {
  const labelStyle =
    "flex flex-col gap-2 text-[20px] tracking-tighter  leading-[125%] relative w-[340px]";
  const inputStyle =
    "p-[10px] rounded-[4px] placeholder-dark/50 dark:placeholder-light/50 bg-light dark:bg-dark";

  return (
    <>
   
   <SignInUpWrapper title="Login">
        <form>
          <div className="flex flex-col gap-4">
            <label className={`${labelStyle}`}>
              {" "}
              Email:
              <input
                className={`${inputStyle}`}
                type="email"
                placeholder="examble@ahmedg.com"
              />
            </label>

            <label className={`${labelStyle}`}>
              {" "}
              Passwored:
              <input
                className={`${inputStyle}`}
                type="Password"
                placeholder="************"
              />
            </label>
          </div>

          <button className="flex justify-center items-center gap-[10px] mt-[16px] font-medium w-full rounded-[5px] py-[10px]  text-light bg-primary disabled:bg-accent/50 disabled:text-dark/50">
            LOGIN
            <ReturnLeft className="text-[24px]" />
          </button>
        </form>
     </SignInUpWrapper>
    </>
  );
}

export default Login_Student;
