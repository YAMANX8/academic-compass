import { Button } from "../../components";
import { MdLogin as Login, MdPerson as Person } from "react-icons/md";

const UnauthenticatedUserSection = ({ loginPath, registerPath }) => {
  return (
    <>
      <Button variant="outlined" page={loginPath}>
        <Login size={24} />
        Log in
      </Button>
      <Button page={registerPath}>
        <Person size={24} />
        Sign up
      </Button>
    </>
  );
};

export default UnauthenticatedUserSection;
