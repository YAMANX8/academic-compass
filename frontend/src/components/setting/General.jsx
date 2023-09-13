import React, { useEffect, useState, useRef } from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import { BsCloudUpload as Upload } from "react-icons/bs";
import axios from "../../apis/axios";
import Profile from "../../assets/images/frontend.svg";
import { Button } from "../index";

const General = ({
  firstName,
  lastName,
  country,
  city,
  image,
  handleChange,
  setImage,
}) => {
  const photo = useRef();

  //styles
  const inputStyle =
    "p-[10px] rounded-[5px] bg-light dark:bg-dark text-dark dark:text-light border border-dark/50 dark:border-light/50 text-[20px] transition-all duration-1000 ease-in-out-back";

  return (
    <>
      <h3 className="text-[32px] tracking-tight font-semibold ">
        General Information
      </h3>

      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">
          Profile Picture Upload
        </h4>
        <div className="flex gap-8">
          <div className=" w-[162px] aspect-square flex justify-center items-center overflow-hidden rounded-full bg-primary text-light text-[36px] font-semibold">
            {image ? (
              <img
                className="object-cover"
                src={
                  typeof image == "string" ? image : URL.createObjectURL(image)
                }
                alt="Profile"
              />
            ) : (
              <p>
                {firstName.charAt(0)} {lastName.charAt(0)}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-between tracking-tight">
            <div>
              <p className="font-medium text-[20px]">{`${firstName} ${lastName}`}</p>
              <p className="pt-[16px] text-dark/50 dark:text-light/50">
                {(city || country) && `${city}, ${country}`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => photo.current.click()}
              className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
            >
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
                ref={photo}
              />
              Upload New Photo
              <Upload />
            </button>
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
              Country
            </label>
            <input
              id="country"
              name="country"
              className={`${inputStyle}`}
              type="text"
              placeholder="Syria"
              value={country}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2 flex-1">
            <label htmlFor="city" className="font-medium text-[22px] leading-l">
              City
            </label>
            <input
              id="city"
              name="city"
              className={`${inputStyle}`}
              type="text"
              placeholder="Damascus"
              value={city}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default General;
