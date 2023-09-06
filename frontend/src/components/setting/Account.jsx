import React, { useState, useEffect } from "react";
import axios from "../../apis/axios";
import toast, { Toaster } from "react-hot-toast";
import { LiaSaveSolid as Solid } from "react-icons/lia";

//styles
const inputStyle = "p-[10px] rounded-[5px] bg-secondary border border-dark/50 dark:border-light/50 text-[20px]";

const GET_INFO_URL = "/studentDashboard/update-account";

const Account = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [education, setEducation] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const response = await axios.get(
          GET_INFO_URL ,
          JSON.stringify(
            { first_name : firstName, last_name:lastName, email, education, birth_date :birthDate, bio }),
        {
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);

        if (response.data && response.data.Data && response.data.Data.data && response.data.Data.data.length) {
          const studentData = response.data.Data.data[0];
          setFirstName(studentData.first_name);
          setLastName(studentData.last_name);
          setEmail(studentData.email);
          setEducation(studentData.education);
          setBio(studentData.bio);
          setBirthDate(studentData.birth_date);  console.log(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch student information.");
      }
    };

    fetchStudentInfo();
  }, []);


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
                htmlFor="firstName"
                className="font-medium text-[22px] leading-l"
              >
                First name
              </label>
              <input
                id="firstName"
                className={`${inputStyle}`}
                type="text"
                placeholder="Ahmad"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
          </div>

          <div className="grid gap-2">
              <label 
                htmlFor="lastName" 
                className="font-medium text-[22px] leading-l"
              >
                Last Name
              </label>
              <input
                id="lastName"
                className={`${inputStyle}`}
                type="text"
                placeholder="omer"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="education" 
                className="font-medium text-[22px] leading-l"
              >
                Education
              </label>
              <input
                id="education"
                className={`${inputStyle}`}
                type="text"
                placeholder="BC in software engineering"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="email" 
                className="font-medium text-[22px] leading-l"
              >
                Email
              </label>
              <input
                id="email"
                className={`${inputStyle}`}
                type="email"
                placeholder="something@anything.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="bio" 
                className="font-medium text-[22px] leading-l"
              >
                Bio
              </label>
              <input
                id="bio"
                className={`${inputStyle}`}
                type="text"
                placeholder="A patinate software engineer stude....."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="grid gap-2 col-span-1 ">
              <label 
                htmlFor="birthDate" 
                className="font-medium text-[22px] leading-l"
              >
                Birth of Date
              </label>
              <input
                id="birthDate"
                className={`${inputStyle}`}
                type="date"
                placeholder="22-8-2023"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
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
