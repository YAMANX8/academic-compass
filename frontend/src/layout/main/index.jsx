import Footer from "./footer";
import Header from "./header";
const MainLayout = ({ children }) => {
  return (
    <main className="bg-light text-dark transition-all duration-1000 ease-in-out-back">
      <Header />
      <div className="flex justify-center py-12 overflow-x-hidden bg-light text-dark transition-colors ease-in-out-back duration-1000">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default MainLayout;
