import { useNavigate } from "react-router-dom";
import { m, motion } from "framer-motion";

import NotFoundImg from "../../assets/images/403.svg";

import { varBounce, MotionContainer } from "../../components";

const NotAuthorized = () => {
  const navigate = useNavigate();
  console.log(window.location.pathname);
  return (
    <MotionContainer className="text-center text-dark dark:text-light bg-light dark:bg-dark text-[24px] flex flex-col gap-4 transition-all duration-1000 ease-in-out-back">
      <motion.div variants={varBounce().inDown}>
        <img src={NotFoundImg} alt="not found" />
      </motion.div>
      <motion.div variants={varBounce().inDown}>
        <p>
          You don’t have permission to view this page.{" "}
          <span className="text-red-600">Access denied</span>
        </p>
      </motion.div>
      <motion.div variants={varBounce().inUp} className="self-center">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
        >
          Go Back
        </button>{" "}
      </motion.div>
    </MotionContainer>
  );
};

export default NotAuthorized;
