import Logo from "/logo.svg";
import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Alert } from "../components/index";

import axios from "../apis/axios";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9-_@.]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.[!@#$%]).{8,24}$/;

function Sign_Up_Student() {
  const navigate = useNavigate();

  const nameRef = useRef();
  const errRef = useRef();
  // states
  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //auto focus on the first name field on load
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  //first name check
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    console.log(result);
    console.log(firstName);
    setValidFirstName(result);
  }, [firstName]);

  //last name check
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    console.log(result);
    console.log(lastName);
    setValidLastName(result);
  }, [lastName]);

  //email check
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  //here we check the password and the confirm field togather
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  //clearing the error message when typing
  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, email, pwd, matchPwd]);

  const labelStyle =
    "flex flex-col gap-2 text-[20px] tracking-tight  leading-[125%] text-dark";
  const inputStyle = "p-[10px] rounded-[8px] leading-[125%]";

  //send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    //we check again because if the user play with the console and change something and enables the submit btn
    if (
      !NAME_REGEX.test(firstName) ||
      !NAME_REGEX.test(lastName) ||
      !PWD_REGEX.test(pwd) ||
      !EMAIL_REGEX.test(email)
    ) {
      setErrMsg("Invalid Entry");
      return;
    }
    // try {
    //   const response = await axios.post(
    //     "/auth",
    //     JSON.stringify({
    //       //backend var name: frontend var name
    //       first_name: firstName,
    //       last_name: lastName,
    //       //here we kept the name because the backend and the frontend have named it the same
    //       email,
    //       password: pwd,
    //     }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    // } catch (error) {
    //   if (!error?.response) setErrMsg("No Server Response");
    //   else if (error.response?.status === 401) setErrMsg(error.response);
    //   else setErrMsg("Regisration Failed");
    //   //****************************************************************** */
    //   //and this line for screen readers
    //   errRef.current.focus();
    // }
    setSuccess(true);
    navigate("/login-student", {
      state: { success: true, text: "Regisration Success" },
    });
  };
  return (
    <>
      <Alert state={success} text={errMsg} />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center gap-4 px-[75px] bg-primary rounded-tl-[20px] rounded-bl-[20px] text-light">
          <h1 className="text-[60px] font-semibold tracking-tight leading-[125%]">
            Register
          </h1>
          <p className="w-[315px] text-[26px] leading-[150%]">
            Chart Your Learning Journey with Interactive Educational Roadmaps
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-[32px] px-[75px] py-[32px] bg-secondary rounded-tr-[20px] rounded-br-[20px] text-light">
          <img src={Logo} alt="logo" className="w-[203px]" />

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <label className={`${labelStyle}`}>
                First Name:
                <input
                  className={`${inputStyle} ${
                    validFirstName && "text-accent dark:text-accent-dark"
                  }`}
                  type="text"
                  placeholder="Ex: Jon"
                  ref={nameRef}
                  autoComplete="off"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  onFocus={() => setFirstNameFocus(true)}
                  onBlur={() => setFirstNameFocus(false)}
                  aria-invalid={validFirstName ? "false" : "true"}
                  aria-describedby="fndnote"
                />
              </label>
              <p
                id="fndnote"
                className={`p-4 bg-accent rounded-2xl text-light ${
                  firstName && firstNameFocus && !validFirstName
                    ? "static"
                    : "absolute -top-[2000px]"
                }`}
              >
                Four characters at least!
                <br />
                24 characters at most!
                <br />
                Must begin with a letter!
                <br />
                Letters, Numbers, Underscores, Hyphens are allowed!
              </p>

              <label className={`${labelStyle}`}>
                Last Name:
                <input
                  className={`${inputStyle} ${
                    validLastName && "text-accent dark:text-accent-dark"
                  }`}
                  type="text"
                  placeholder="Ex: Doe"
                  autoComplete="off"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                  aria-invalid={validLastName ? "false" : "true"}
                  aria-describedby="lndnote"
                />
              </label>
              <p
                id="lndnote"
                className={`p-4 bg-accent rounded-2xl text-light ${
                  lastName && lastNameFocus && !validLastName
                    ? "static"
                    : "absolute -top-[2000px]"
                }`}
              >
                Four characters at least!
                <br />
                24 characters at most!
                <br />
                Must begin with a letter!
                <br />
                Letters, Numbers, Underscores, Hyphens are allowed!
              </p>

              <label className={`${labelStyle}`}>
                Email:
                <input
                  className={`${inputStyle} ${
                    validEmail && "text-accent dark:text-accent-dark"
                  }`}
                  type="email"
                  placeholder="example@something.com"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="ednote"
                />
              </label>
              <p
                id="ednote"
                className={`p-4 bg-accent rounded-2xl text-light ${
                  email && emailFocus && !validEmail
                    ? "static"
                    : "absolute -top-[2000px]"
                }`}
              >
                Four characters at least!
                <br />
                24 characters at most!
                <br />
                Must begin with a letter!
                <br />
                Letters, Numbers, Underscores, Hyphens are allowed!
              </p>

              <label className={`${labelStyle}`}>
                Password:
                <input
                  className={`${inputStyle} ${
                    validPwd && "text-accent dark:text-accent-dark"
                  }`}
                  type="Password"
                  placeholder="************"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                />
              </label>
              <p
                id="pwdnote"
                className={`p-4 bg-accent rounded-2xl text-light ${
                  pwd && pwdFocus && !validPwd
                    ? "static"
                    : "absolute -top-[2000px]"
                }`}
              >
                Eight characters at least!
                <br />
                24 characters at most!
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character!
                <br />
                Only <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span> are allowed!
              </p>

              <label className={`${labelStyle}`}>
                Confirm Password:
                <input
                  className={`${inputStyle} ${
                    validMatchPwd && "text-accent dark:text-accent-dark"
                  }`}
                  type="Password"
                  placeholder="************"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  onFocus={() => setMatchPwdFocus(true)}
                  onBlur={() => setMatchPwdFocus(false)}
                  aria-invalid={validMatchPwd ? "false" : "true"}
                  aria-describedby="confirmnote"
                />
              </label>
              <p
                id="confirmnote"
                className={`p-4 bg-accent rounded-2xl text-light ${
                  matchPwd && matchPwdFocus && !validMatchPwd
                    ? "static"
                    : "absolute -top-[2000px]"
                }`}
              >
                Must match the password
              </p>
            </div>

            <button
              className="flex justify-center items-center  gap-[10px] mt-[32px] font-medium w-[353px] rounded-[5px] py-[10px]  text-light h-[44px] bg-primary disabled:bg-accent/50 disabled:text-dark/50"
              disabled={
                !validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPwd ||
                !validMatchPwd
                  ? true
                  : false
              }
            >
              SIGN UP
              <ReturnLeft className="text-[24px]" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Sign_Up_Student;
