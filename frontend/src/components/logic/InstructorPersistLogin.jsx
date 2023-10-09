import useAuth from "../../hooks/useAuth";
import axios from "../../apis/axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {Preloader} from "../index"
const InstructorPersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setIsAuth } = useAuth();
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get("/auth2/is-verify", {
          headers: {
            token: localStorage.token,
          },
        });
        response?.data == true ? setIsAuth(true) : setIsAuth(false);

      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken ? verify() : setIsLoading(false);
  }, []);
  return <>{isLoading ? <Preloader /> : <Outlet />}</>;
};

export default InstructorPersistLogin;
