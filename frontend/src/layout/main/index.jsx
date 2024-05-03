import Footer from "./footer";
import Header from "./header";
import { useScrollToTop } from "../../hooks/use-scroll-to-top";
const MainLayout = ({ children }) => {
  useScrollToTop();
  return (
    <main className="bg-light text-dark transition-all duration-1000 ease-in-out-back">
      <Header />
      <div className="flex justify-center overflow-x-hidden bg-light py-12 text-dark transition-colors duration-1000 ease-in-out-back">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
