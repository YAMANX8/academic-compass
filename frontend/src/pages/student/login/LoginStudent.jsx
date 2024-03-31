import {
  BsArrowReturnLeft as ReturnLeft,
  BsEyeSlash as Hide,
  BsEye as Show,
} from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuthContext } from "src/auth/hooks";

import { Helmet } from "react-helmet-async";
import { paths } from "src/routes/paths";

function LoginStudent() {
  const { studentLogin } = useAuthContext();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const emailRef = useRef();

  const labelStyle =
    "flex flex-col gap-2 text-[20px] tracking-tight leading-l relative w-[340px]";
  const inputStyle =
    "p-[10px] pr-[50px] rounded-[4px] placeholder-dark/50 dark:placeholder-light/50 bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await studentLogin(email, pwd);
      setEmail("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 401) {
        toast.error("Missing Email or Password");
      } else if (err.response?.status === 402) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Academic Compass: Login</title>
      </Helmet>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className={`${labelStyle}`}>
            Email:
            <input
              className={`${inputStyle}`}
              type="email"
              placeholder="example@something.com"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="username"
              required
            />
          </label>

          <label className={`${labelStyle}`}>
            Password:
            <input
              className={`${inputStyle}`}
              type={isVisible ? "text" : "password"}
              placeholder="********"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="absolute right-0 top-11 flex items-center px-4 text-gray-600"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? <Show /> : <Hide />}
            </button>
          </label>
        </div>

        <button className="flex justify-center items-center gap-[10px] mt-[16px] font-medium w-full rounded-[5px] py-[10px] text-light bg-primary disabled:bg-accent/50 disabled:text-dark/50">
          LOGIN
          <ReturnLeft className="text-[24px]" />
        </button>
      </form>
      <Link
        className="text-[14px] underline text-primary dark:text-accent-dark"
        to={paths.auth.student.register}
        style={{ alignSelf: "flex-start" }}
      >
        Register new Account
      </Link>
    </>
  );
}

export default LoginStudent;
