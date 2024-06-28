import Main from "./main";
import Header from "./header";
import NavVertical from "./nav-vertical";
import { useAuthContext } from "../../auth/hooks";
const AdminLayout = ({ children, option }) => {
  const { role } = useAuthContext();
  return (
    <div className="flex h-screen max-h-screen w-full flex-col overflow-hidden bg-light text-dark ">
      <Header />
      <div className="flex flex-grow">
        {option !== "noNav" && <NavVertical role={role} option={option} />}
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default AdminLayout;
