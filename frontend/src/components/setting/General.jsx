import React, { useEffect, useState } from "react";
import { LiaSaveSolid as Solid } from "react-icons/lia";
import { BsCloudUpload as Upload } from "react-icons/bs";
import axios from "../../apis/axios";
import toast, { Toaster } from "react-hot-toast";
import Profile from "../../assets/images/frontend.svg";
import { Button } from "../index";

const SECURITY_URL = "/setting";

const General = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [imagePath, setImagePath] = useState(Profile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getInfo", {
          headers: {
            token: localStorage.token,
          },
        });
        const studentData = response.data.Data.data[0];
        setCountry(studentData.country);
        setCity(studentData.city);
        setImagePath(studentData.image_path);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        SECURITY_URL,
        JSON.stringify({ country, city }),
        {
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  //styles
  const inputStyle =
    "p-[10px] rounded-[5px] bg-secondary border border-dark/50 dark:border-light/50 text-[20px]";

  return (
    <form className="p-8 flex flex-col gap-8 flex-1 " onSubmit={handleSubmit}>
      <h3 className="text-[32px] tracking-tight font-semibold ">General Information</h3>

      <div>
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">Profile Picture Upload</h4>
        <div className="flex gap-8">
          <div>
            <img className="w-[162px] aspect-square" src={imagePath} alt="Profile" />
          </div>
          <div className="flex flex-col justify-between tracking-tight">
            <div>
              <p className="font-medium text-[20px]">Jone Doe</p>
              <p className="pt-[16px] text-primary">{`${city}, ${country}`}</p>
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
        <h4 className="text-[22px] tracking-tight font-semibold mb-4">Address</h4>
        <div className="flex gap-4 justify-between">
          <div className="grid gap-2 flex-1">
            <label htmlFor="country" className="font-medium text-[22px] leading-l">Country</label>
            <input
              id="country"
              className={`${inputStyle}`}
              type="text"
              placeholder="Syria"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="grid gap-2 flex-1">
            <label htmlFor="city" className="font-medium text-[22px] leading-l">City</label>
            <input
              id="city"
              className={`${inputStyle}`}
              type="text"
              placeholder="Damascus"
              value={city}
              onChange={(e) => setCity(e.target.value)}
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
    </form>
  );
}

export default General;
