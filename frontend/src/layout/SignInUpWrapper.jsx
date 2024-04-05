import { Logo } from "../components";
const SignInUpWrapper = ({ title, children }) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-center shadow-[0_0_25px_0] shadow-black/30 rounded-[22px]">
        <div className="flex flex-col justify-center text-center gap-4 px-4 bg-primary rounded-tl-[20px] rounded-bl-[20px] text-light">
          <h1 className="w-[318px] text-[48px] font-semibold tracking-tighter leading-[125%]">
            {title}
          </h1>
          <p className="w-[318px] text-[20px] leading-[150%] tracking-wider">
            Chart Your Learning Journey with Interactive Educational Roadmaps
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 bg-secondary dark:bg-secondary-dark rounded-tr-[20px] rounded-br-[20px] text-dark dark:text-light transition-colors duration-1000 ease-in-out-back">
          <Logo disabledLink className="w-[203px]" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default SignInUpWrapper;
