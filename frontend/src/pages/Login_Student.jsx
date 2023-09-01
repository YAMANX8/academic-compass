import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
import { SignInUpWrapper } from "../layout";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "../apis/axios";
import { Link } from "react-router-dom";

const LOGIN_URL = "/auth/student/login";

function Login_Student() {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const emailRef = useRef();

  const labelStyle =
    "flex flex-col gap-2 text-[20px] tracking-tight leading-l relative w-[340px]";
  const inputStyle =
    "p-[10px] rounded-[4px] placeholder-dark/50 dark:placeholder-light/50 bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.token;
      // const roles = response?.data?.roles;
      setAuth({ email, pwd, accessToken });
      console.log();
      toast.success("Login successfuly");
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
      <div>
        <Toaster />
      </div>
      <SignInUpWrapper title="Login">
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
                required
              />
            </label>

            <label className={`${labelStyle}`}>
              Password:
              <input
                className={`${inputStyle}`}
                type="Password"
                placeholder="********"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </label>
          </div>

          <button className="flex justify-center items-center gap-[10px] mt-[16px] font-medium w-full rounded-[5px] py-[10px] text-light bg-primary disabled:bg-accent/50 disabled:text-dark/50">
            LOGIN
            <ReturnLeft className="text-[24px]" />
          </button>
        </form>
        <Link
          className="text-[14px] underline text-primary dark:text-accent-dark"
          to="/register-student"
          style={{ alignSelf: "flex-start" }}
        >
          Register new Account
        </Link>
      </SignInUpWrapper>
    </>
  );
}

export default Login_Student;
