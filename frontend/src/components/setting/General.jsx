import React from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import { BsCloudUpload as Upload } from "react-icons/bs";

import Profile from "../../assets/images/frontend.svg";
import { Button } from "../index";
function General() {
  const firstName = "Jone";
  const lastName = "Doe";
  const location = "Damascus, Syria";
  const images = { Profile };

  //styles
  const inputStyle =
    "p-[10px] rounded-[5px] bg-secondary border border-dark/50 dark:border-light/50 text-[20px]";

  return (
    <form className="p-8 flex flex-col gap-8 flex-1">
      <h3 className="text-[32px] tracking-tight font-semibold ">
        General Information
      </h3>

      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">
          Profile Picture Upload
        </h4>
        <div className="flex gap-8">
          <div>
            <img className="w-[162px] aspect-square" src={images.Profile} />
          </div>
          <div className="flex flex-col justify-between tracking-tight">
            <div>
              <p className="font-medium text-[20px]">
                {firstName} {lastName}
              </p>
              <p className="pt-[16px] text-primary">{location}</p>
            </div>
            <div>
              <Button>
                Upload New Photo <Upload className="text-[25px]" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">
          Address
        </h4>
        <div className="flex gap-4 justify-between">
          <div className="grid gap-2 flex-1">
            <label
              htmlFor="country"
              className="font-medium text-[22px] leading-l"
            >
              Country{" "}
            </label>
            <input
              id="country"
              className={`${inputStyle}`}
              type="text"
              placeholder="Syria"
            />
          </div>
          <div className="grid gap-2 flex-1">
            <label htmlFor="city" className="font-medium text-[22px] leading-l">
              {" "}
              City{" "}
            </label>
            <input
              id="city"
              className={`${inputStyle}`}
              type="text"
              placeholder="Damascus"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className=" self-end flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
      >
        Save Changes <Solid className="text-[25px]" />
      </button>
    </form>
  );
}

export default General;
