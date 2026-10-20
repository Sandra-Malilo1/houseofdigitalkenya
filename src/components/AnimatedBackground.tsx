"use client";

import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute w-[200%] h-[200%] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-90 blur-3xl"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          scale: [1, 1.1, 1],
          borderRadius: ["0%", "40%", "0%"]
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />
      {/* Subtle floating glow orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen blur-3xl"
        animate={{
          x: [0, 200, -100, 0],
          y: [0, -150, 100, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-rose-400/20 rounded-full mix-blend-screen blur-3xl"
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 100, -100, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
