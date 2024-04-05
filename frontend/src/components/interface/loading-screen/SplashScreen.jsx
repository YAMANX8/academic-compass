import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import Logo from "../Logo";

const SplashScreen = ({ className, ...other }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-100 z-50 ${className}`}
      {...other}
    >
      <>
        <motion.div
          animate={{
            scale: [0.9, 1, 1, 0.9, 0.9],
            opacity: [0.48, 1, 1, 0.48, 0.48],
          }}
          transition={{
            duration: 3.2,
            ease: "backInOut",
            repeat: Infinity,
          }}
        >
          <Logo disabledLink className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1, 1.2, 1.2],
            rotate: [270, 0, 0, 270, 270],
            opacity: [0.25, 1, 1, 1, 0.25],
            borderRadius: ["50%", "50%", "25%", "25%", "50%"],
          }}
          transition={{ ease: "backInOut", duration: 3.2, repeat: Infinity }}
          className="w-40 h-40 absolute border-[3px] border-accent/75 rounded-[25%]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ["50%", "50%", "25%", "25%", "50%"],
          }}
          transition={{
            ease: "backInOut",
            duration: 3.2,
            repeat: Infinity,
          }}
          className="w-[185px] h-[185px] absolute border-[3px] border-accent-dark/75 rounded-[25%]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1.1, 1, 1],
            rotate: [0, 270, 270, 0, 0],
            opacity: [1, 0.25, 0.25, 0.25, 1],
            borderRadius: ["50%", "50%", "25%", "25%", "50%"],
          }}
          transition={{
            ease: "backInOut",
            duration: 3.2,
            repeat: Infinity,
          }}
          className="w-44 h-44 absolute border-[3px] border-primary/75 rounded-[25%]"
        />
      </>
    </div>
  );
};

export default SplashScreen;
