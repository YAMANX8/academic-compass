import Main from "./main";
import Header from "./header";
import NavVertical from "./nav-vertical";
const AdminLayout = ({ children, role, option }) => {
  return (
    <div className="container flex h-screen max-h-screen flex-col overflow-hidden bg-light text-dark">
      <Header />
      <div className="flex flex-grow">
        <NavVertical role={role} option={option} />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default AdminLayout;
