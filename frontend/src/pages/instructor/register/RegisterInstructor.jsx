import {
  BsArrowReturnLeft as ReturnLeft,
  BsEyeSlash as Hide,
  BsEye as Show,
} from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "src/auth/hooks";
import { Helmet } from "react-helmet-async";
import { paths } from "src/routes/paths";
import { Button } from "../../../components";
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

function RegisterInstructor() {
  const { instructorRegister } = useAuthContext();
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
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);
  const [isMatchVisible, setIsMatchVisible] = useState(false);

  //auto focus on the first name field on load
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  //first name check
  useEffect(() => {
    const result = NAME_REGEX.test(firstName);
    setValidFirstName(result);
  }, [firstName]);

  //last name check
  useEffect(() => {
    const result = NAME_REGEX.test(lastName);
    setValidLastName(result);
  }, [lastName]);

  //email check
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  //here we check the password and the confirm field togather
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  //send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    //we check again because if the user play with the console and change something and enables the submit btn
    if (
      !NAME_REGEX.test(firstName) ||
      !NAME_REGEX.test(lastName) ||
      !PWD_REGEX.test(pwd) ||
      !EMAIL_REGEX.test(email) ||
      !validMatchPwd
    ) {
      toast.error("Invalide entries");
      return;
    }
    try {
      await instructorRegister(email, pwd, firstName, lastName);
    } catch (error) {
      if (!error?.response) {
        toast.error("No Server Response");
      } else if (error.response?.status === 401) {
        toast.error("User already exists");
      } else {
        toast.error("Registration Failed");
      }

      //and this line for screen readers
      errRef.current.focus();
    }
  };

  const labelStyle =
    "flex flex-col gap-2 text-[20px] tracking-tighter  leading-l relative w-[340px]";
  const inputStyle =
    "p-[10px] pr-[50px] rounded-[4px] placeholder-dark/50 dark:placeholder-light/50 bg-light dark:bg-dark transition-all duration-1000 ease-in-out-back";
  const notes =
    "p-4 bg-accent rounded-2xl text-light absolute z-10 w-[300px] right-0";

  return (
    <>
      <Helmet>
        <title>Academic Compass: Sign Up</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className={`${labelStyle}`}>
            First Name:
            <input
              className={`${inputStyle} ${
                validFirstName
                  ? "text-accent dark:text-accent-dark"
                  : "text-dark dark:text-light"
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
            <p
              id="fndnote"
              className={`${notes} ${
                firstName && firstNameFocus && !validFirstName
                  ? " top-[86px]"
                  : "-top-[2000px]"
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
          </label>

          <label className={`${labelStyle}`}>
            Last Name:
            <input
              className={`${inputStyle} ${
                validLastName
                  ? "text-accent dark:text-accent-dark"
                  : "text-dark dark:text-light"
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
            <p
              id="lndnote"
              className={`${notes} ${
                lastName && lastNameFocus && !validLastName
                  ? "top-[86px]"
                  : "-top-[2000px]"
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
          </label>

          <label className={`${labelStyle}`}>
            Email:
            <input
              className={`${inputStyle} ${
                validEmail
                  ? "text-accent dark:text-accent-dark"
                  : "text-dark dark:text-light"
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
            <p
              id="ednote"
              className={`${notes} ${
                email && emailFocus && !validEmail
                  ? "top-[86px]"
                  : "-top-[2000px]"
              }`}
            >
              Must be a valid email address
            </p>
          </label>

          <label className={`${labelStyle}`}>
            Password:
            <input
              className={`${inputStyle} ${
                validPwd
                  ? "text-accent dark:text-accent-dark"
                  : "text-dark dark:text-light"
              }`}
              type={isPwdVisible ? "text" : "password"}
              placeholder="********"
              onChange={(e) => setPwd(e.target.value)}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              autoComplete="new-password"
            />
            <p
              id="pwdnote"
              className={`${notes} ${
                pwd && pwdFocus && !validPwd ? "top-[86px]" : "-top-[2000px]"
              }`}
            >
              Six characters at least!
              <br />
              Must include at least one letter and one number!
              <br />
              Special characters are optional!
            </p>
            <button
              type="button"
              className="absolute right-0 top-11 flex items-center px-4 text-gray-600"
              onClick={() => setIsPwdVisible((prev) => !prev)}
            >
              {isPwdVisible ? <Show /> : <Hide />}
            </button>
          </label>

          <label className={`${labelStyle}`}>
            Confirm Password:
            <input
              className={`${inputStyle} ${
                validMatchPwd
                  ? "text-accent dark:text-accent-dark"
                  : "text-dark dark:text-light"
              }`}
              type={isMatchVisible ? "text" : "password"}
              placeholder="********"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              onFocus={() => setMatchPwdFocus(true)}
              onBlur={() => setMatchPwdFocus(false)}
              aria-invalid={validMatchPwd ? "false" : "true"}
              aria-describedby="confirmnote"
              autoComplete="new-password"
            />
            <p
              id="confirmnote"
              className={`${notes} ${
                matchPwd && matchPwdFocus && !validMatchPwd
                  ? "top-[86px]"
                  : "-top-[2000px]"
              }`}
            >
              Must match the password
            </p>
            <button
              type="button"
              className="absolute right-0 top-11 flex items-center px-4 text-gray-600"
              onClick={() => setIsMatchVisible((prev) => !prev)}
            >
              {isMatchVisible ? <Show /> : <Hide />}
            </button>
          </label>
        </div>

        <Button
          size="lg"
          color="accent"
          className="mt-4 w-full"
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
          <ReturnLeft size={24} />
        </Button>
      </form>
      <Button
        variant="text"
        size="sm"
        page={paths.auth.instructor.login}
        style={{ alignSelf: "flex-start" }}
      >
        Already have an Account
      </Button>
    </>
  );
}

export default RegisterInstructor;
