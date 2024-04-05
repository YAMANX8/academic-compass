import Footer from "./footer";
import Header from "./header";
const MainLayout = ({ children }) => {
  return (
    <main className="bg-light dark:bg-dark text-dark dark:text-light transition-all duration-1000 ease-in-out-back">
      <Header />
      <div className="flex justify-center py-12 overflow-x-hidden bg-light dark:bg-dark text-dark dark:text-light transition-colors ease-in-out-back duration-1000">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
