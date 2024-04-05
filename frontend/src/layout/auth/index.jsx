import Footer from "./footer";
import Header from "./header";
import { Logo } from "../../components";

const AuthLayout = ({ subtitle, title, children }) => {
  return (
    <main className="bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
      <Header />
      <div className="flex justify-center py-12 overflow-x-hidden bg-light dark:bg-dark text-dark dark:text-light transition-colors ease-in-out-back duration-1000">
        {/* _________________ */}
        <div className="flex justify-center">
          <div className="flex justify-center shadow-[0_0_25px_0] shadow-black/30 rounded-[22px]">
            <div className="flex flex-col justify-center text-center gap-4 px-4 bg-primary rounded-tl-[20px] rounded-bl-[20px] text-light">
              <h1 className="w-[318px] text-[48px] font-semibold tracking-tighter leading-[125%]">
                {title}
              </h1>
              <p className="w-[318px] text-[20px] leading-[150%] tracking-wider">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 bg-secondary dark:bg-secondary-dark rounded-tr-[20px] rounded-br-[20px] text-dark dark:text-light transition-colors duration-1000 ease-in-out-back">
              <Logo disabledLink className="w-[203px]" />
              {children}
            </div>
          </div>
        </div>
        {/* ____________________ */}
      </div>
      <Footer />
    </main>
  );
};

export default AuthLayout;
