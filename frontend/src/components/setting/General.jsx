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
      <h3 className="text-[32px] font-semibold tracking-tight ">
        General Information
      </h3>

      <div>
        <h4 className="mb-4 text-[22px] font-semibold tracking-tight">
          Profile Picture Upload
        </h4>
        <div className="flex gap-8">
          <div className=" flex aspect-square w-[162px] items-center justify-center overflow-hidden rounded-full bg-primary text-[36px] font-semibold text-light">
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
              <p className="text-[20px] font-medium">{`${firstName} ${lastName}`}</p>
              <p className="pt-[16px] text-dark/50 dark:text-light/50">
                {(city || country) && `${city}, ${country}`}
              </p>
            </div>
            <Button type="button" onClick={() => photo.current.click()}>
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                hidden
                ref={photo}
              />
              Upload New Photo
              <Upload />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-[22px] font-semibold tracking-tight">
          Address
        </h4>
        <div className="flex justify-between gap-4">
          <div className="grid flex-1 gap-2">
            <label
              htmlFor="country"
              className="text-[22px] font-medium leading-l"
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
          <div className="grid flex-1 gap-2">
            <label htmlFor="city" className="text-[22px] font-medium leading-l">
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
