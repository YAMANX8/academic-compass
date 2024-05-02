import { useNavigate } from "react-router-dom";
import NotFoundImg from "src/assets/images/404.svg";
import { varBounce, MotionContainer, Button } from "../../components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <MotionContainer className="flex flex-col gap-4 bg-light text-center text-[24px] text-dark transition-all duration-1000 ease-in-out-back">
        <motion.div variants={varBounce().inDown}>
          <img src={NotFoundImg} alt="not found" />
        </motion.div>
        <motion.div variants={varBounce().inDown}>
          <p>
            The page you are looking for is{" "}
            <span className="text-error">Not Found</span>
          </p>
        </motion.div>
        <motion.div variants={varBounce().inUp} className="self-center">
          <Button size="lg" color="error" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </motion.div>
      </MotionContainer>
    </>
  );
};

export default NotFound;
