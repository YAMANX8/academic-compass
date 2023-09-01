import React from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
//styles
const inputStyle =
"p-[10px] rounded-[5px] bg-secondary border border-dark/50 dark:border-light/50 text-[20px]";

const Account = () => {
  return <form className="p-8 flex flex-col gap-8 flex-1">
  <h3 className="text-[32px] tracking-tight font-semibold">
     Account 
  </h3>
  <div>
      <h4 className="text-[22px] tracking-tight font-semibold mb-4">
      Profile
      </h4>
      <div className="grid gap-4 grid-cols-2">

          <div className="grid gap-2">
              <label
                htmlFor="country"
                className="font-medium text-[22px] leading-l"
              >
                First name
              </label>
              <input
                id="country"
                className={`${inputStyle}`}
                type="password"
                placeholder="Ahmad"
              />
          </div>

          <div className="grid gap-2">
              <label 
                htmlFor="newPassword" 
                className="font-medium text-[22px] leading-l"
              >
                Last Name
              </label>
              <input
                id="newPassword"
                className={`${inputStyle}`}
                type="password"
                placeholder="omer"
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="verifyNewPassword" 
                className="font-medium text-[22px] leading-l"
              >
                Education
              </label>
              <input
                id="verifyNewPassword"
                className={`${inputStyle}`}
                type="password"
                placeholder="BC in software engineering"
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="verifyNewPassword" 
                className="font-medium text-[22px] leading-l"
              >
                Email
              </label>
              <input
                id="verifyNewPassword"
                className={`${inputStyle}`}
                type="password"
                placeholder="something@anything.com"
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="verifyNewPassword" 
                className="font-medium text-[22px] leading-l"
              >
                Bio
              </label>
              <input
                id="verifyNewPassword"
                className={`${inputStyle}`}
                type="password"
                placeholder="A patinate software engineer stude....."
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="verifyNewPassword" 
                className="font-medium text-[22px] leading-l"
              >
                Birth of Date
              </label>
              <input
                id="verifyNewPassword"
                className={`${inputStyle}`}
                type="password"
                placeholder="22-8-2023"
              />
          </div>

          
      </div>
  </div>
  <button
    type="submit"
    className="self-end flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
  >
    Save Changes <Solid className="text-[25px]" />
  </button>
</form>;
};

export default Account;
