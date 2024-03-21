import { useNavigate } from "react-router-dom";
import NotFoundImg from "src/assets/images/404.svg";
import { varBounce, MotionContainer } from "src/components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <MotionContainer className="text-center text-dark dark:text-light bg-light dark:bg-dark text-[24px] flex flex-col gap-4 transition-all duration-1000 ease-in-out-back">
        <motion.div variants={varBounce().inDown}>
          <img src={NotFoundImg} alt="not found" />
        </motion.div>
        <motion.div variants={varBounce().inDown}>
          <p>
            The page you are looking for is{" "}
            <span className="text-red-600">Not Found</span>
          </p>
        </motion.div>
        <motion.div variants={varBounce().inUp} className="self-center">
          <button
            onClick={() => navigate(-1)}
            className="self-center flex justify-center items-center gap-[10px] px-[20px] py-[10px] font-semibold rounded-[5px] text-light bg-gradient-to-r from-primary to-accent"
          >
            Go Back
          </button>
        </motion.div>
      </MotionContainer>
    </>
  );
};

export default NotFound;
