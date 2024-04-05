import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../../components";
import { SectionWrapper } from "../../layout";

const Layout = () => {
  return (
    <main className=" bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
      <Navbar />
      <SectionWrapper>
        <Outlet />
      </SectionWrapper>
      <Footer />
    </main>
  );
};

export default Layout;
