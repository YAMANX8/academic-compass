import { Logo, Switcher, Button } from "../../components";
import { paths } from "../../routes/paths";
import UnauthenticatedUserSection from "../components/UnauthenticatedUserSection";
import SearchForm from "../components/SearchForm";

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full justify-between bg-light px-20  py-4 text-dark shadow-lg transition-colors duration-1000 ease-in-out-back">
      <div>
        <Logo className="w-[150px]" />
      </div>
      <div className="flex items-center gap-[16px]">
        <SearchForm />
        <Button variant="text" page={paths.roadmaps} className="!text-dark">
          Roadmaps
        </Button>
        <Button variant="text" page={paths.main.others} className="!text-dark">
          Become part of Academic compass
        </Button>

        <UnauthenticatedUserSection
          loginPath={paths.auth.student.login}
          registerPath={paths.auth.student.register}
        />

        <Switcher />
      </div>
    </nav>
  );
};

export default Header;
