import { useNavigate } from "react-router-dom";
import NotFoundImg from "../assets/images/404.svg";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center text-dark dark:text-light bg-light dark:bg-dark text-[24px] flex flex-col gap-4 transition-all duration-1000 ease-in-out-back">
      <img src={NotFoundImg} alt="not found" />
      <p>
        The page you are looking for is{" "}
        <span className="text-red-600">Not Found</span>
      </p>
      <button
        onClick={() => navigate(-1)}
        className="self-center flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
