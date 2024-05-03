import Footer from "./footer";
import Header from "./header";
import { Logo } from "../../components";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
const AuthLayout = ({ subtitle, title, children }) => {
  useScrollToTop();
  return (
    <main className="bg-light text-dark transition-all duration-1000 ease-in-out-back dark:bg-dark dark:text-light">
      <Header />
      <div className="flex justify-center overflow-x-hidden bg-light py-12 text-dark transition-colors duration-1000 ease-in-out-back dark:bg-dark dark:text-light">
        {/* _________________ */}
        <div className="flex justify-center">
          <div className="flex justify-center rounded-[22px] shadow-[0_0_25px_0] shadow-black/30">
            <div className="flex flex-col justify-center gap-4 rounded-bl-[20px] rounded-tl-[20px] bg-primary px-4 text-center text-light">
              <h1 className="w-[318px] text-[48px] font-semibold leading-[125%] tracking-tighter">
                {title}
              </h1>
              <p className="tracking-wider w-[318px] text-[20px] leading-[150%]">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-br-[20px] rounded-tr-[20px] bg-secondary px-4 py-8 text-dark transition-colors duration-1000 ease-in-out-back dark:bg-secondary-dark dark:text-light">
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
