import useAuth from "../../hooks/useAuth";
import axios from "../../apis/axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Preloader } from "../index";
const SETTINGS_URL = "/student/setting";

const DataRetrieval = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const getAndSetData = async () => {
      try {
        const res = await axios.get(SETTINGS_URL, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
        });
        const response = await res?.data?.reuslut;
        await setAuth((prev) => ({
          ...prev,
          firstName: response.firstName,
          lastName: response.lastName,
          education: response.education,
          email: response.email,
          bio: response.bio,
          birthDate: response.birthDate,
          country: response.country,
          city: response.city,
          image: response.image,
        }));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if ( !auth?.firstName ) {
      getAndSetData();
    } else setIsLoading(false);
  }, []);
  return <>{isLoading ? <Preloader /> : <Outlet />}</>;
};

export default DataRetrieval;
