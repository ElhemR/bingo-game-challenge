import { motion, useCycle } from 'framer-motion';

const BingoAnimation = () => {
  const [isAnimating, cycleAnimation] = useCycle(true, true);

  const handleAnimationComplete = () => {
    cycleAnimation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isAnimating ? { opacity: 1, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3}}
      onAnimationComplete={handleAnimationComplete}
    >
        <h1 className="game-title">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          B
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          I
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          N
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          G
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          O
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={isAnimating ? { opacity: 1, y: 0 } : {}}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: 1 }}
        >
          !
        </motion.span>
      </h1>
    </motion.div>
  );
};

export default BingoAnimation;