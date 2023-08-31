import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
import { SignInUpWrapper } from "../layout";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "../apis/axios";

const LOGIN_URL = '/auth';

function Login_Student() {
  const { setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  
  const emailRef = useRef();

  const labelStyle = "flex flex-col gap-2 text-[20px] tracking-tighter  leading-[125%] relative w-[340px]";
  const inputStyle = "p-[10px] rounded-[4px] placeholder-dark/50 dark:placeholder-light/50 bg-light dark:bg-dark";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, pwd }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      // Handling errors similarly to the second code
      // You can modify these based on your backend responses
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  return (
    <>
      {success ? (
        // You can modify the success UI as per your requirements
        <h1>You are logged in!</h1>
      ) : (
        <SignInUpWrapper title="Login">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className={`${labelStyle}`}>
                Email:
                <input
                  className={`${inputStyle}`}
                  type="email"
                  placeholder="example@ahmedg.com"
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
                  placeholder="************"
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

            {errMsg && <p className="errmsg">{errMsg}</p>}
          </form>
        </SignInUpWrapper>
      )}
    </>
  );
}

export default Login_Student;
