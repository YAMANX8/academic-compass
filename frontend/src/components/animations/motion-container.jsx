import { m, motion } from 'framer-motion';

import { varContainer } from './container';

// ----------------------------------------------------------------------

export default function MotionContainer({ animate, action = false, children, ...other }) {
  if (action) {
    return (
      <motion.div
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </motion.div>
  );
}
