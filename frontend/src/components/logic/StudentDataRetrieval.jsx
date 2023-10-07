import useAuth from "../../hooks/useAuth";
import axios from "../../apis/axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Preloader } from "../index";
const SETTINGS_URL = "/student/setting";
import moment from "moment";
const StudentDataRetrieval = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, setAuth } = useAuth();
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
          accessToken: localStorage.token,
          role: localStorage.role,
          firstName: response.firstName,
          lastName: response.lastName,
          education: response.education,
          email: response.email,
          bio: response.bio,
          birthDate: moment(response.birthDate).format("YYYY-MM-DD"),
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

    if (isAuth) {
      getAndSetData();
    } else setIsLoading(false);
  }, []);
  return <>{isLoading ? <Preloader /> : <Outlet />}</>;
};

export default StudentDataRetrieval;
