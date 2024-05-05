import { Logo } from "../../components";
import AuthenticatedUserSection from "../components/authenticated-user-section";
const Header = () => {
  return (
    <header className="flex h-20 items-center justify-between px-20 py-4 shadow">
      <Logo className="h-full object-contain" disabledLink />
      <AuthenticatedUserSection />
    </header>
  );
};

export default Header;
