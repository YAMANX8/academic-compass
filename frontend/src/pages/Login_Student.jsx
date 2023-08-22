import Logo from "/logo.svg";
import { BsArrowReturnLeft as ReturnLeft } from "react-icons/bs";
function Login_Student() {
  const labelStyle =
    "flex flex-col gap-2 text-[20px] tracking-tight  leading-[125%] text-dark";
  const inputStyle = "p-[10px] rounded-[2px] leading-[125%]";

  return (
    <div className="flex justify-center py-[48px] px-[120px] ">
      <div className="flex flex-col justify-center gap-4 px-[100px] bg-primary rounded-tl-[20px] rounded-bl-[20px] text-light">
        <h1 className="text-[60px] font-semibold tracking-tight leading-[125%]">
          Login
        </h1>
        <p className="w-[315px] text-[26px] leading-[150%]">
          Chart Your Learning Journey with Interactive Educational Roadmaps
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-[74px] px-[100px] py-[48px] bg-secondary rounded-tr-[20px] rounded-br-[20px] text-light">
        <img src={Logo} alt="logo" className="w-[203px]" />

        <form>
          <div className="flex flex-col gap-4">
            <label className={`${labelStyle}`}>
              {" "}
              Email:
              <input
                className={`${inputStyle}`}
                type="email"
                placeholder="examble@ahmedg.com"
              />
            </label>

            <label className={`${labelStyle}`}>
              {" "}
              Passwored:
              <input
                className={`${inputStyle}`}
                type="Password"
                placeholder="************"
              />
            </label>
          </div>

          <button className="flex justify-center items-center  gap-[10px] mt-[74px] font-medium w-[353px] rounded-[5px] py-[10px]  text-light h-[44px] bg-primary">
            LOGIN
            <ReturnLeft className="text-[24px]" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login_Student;
