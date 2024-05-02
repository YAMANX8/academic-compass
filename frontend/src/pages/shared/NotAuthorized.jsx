import { useNavigate } from "react-router-dom";
import { m, motion } from "framer-motion";

import NotFoundImg from "../../assets/images/403.svg";
import { Helmet } from "react-helmet-async";
import { varBounce, MotionContainer, Button } from "../../components";

const NotAuthorized = () => {
  const navigate = useNavigate();
  console.log(window.location.pathname);
  return (
    <>
      <Helmet>
        <title>Access Denied</title>
      </Helmet>
      <MotionContainer className="flex flex-col gap-4 bg-light text-center text-[24px] text-dark transition-all duration-1000 ease-in-out-back dark:bg-dark dark:text-light">
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
          <Button onClick={() => navigate(-1)}>Go Back</Button>{" "}
        </motion.div>
      </MotionContainer>
    </>
  );
};

export default NotAuthorized;
