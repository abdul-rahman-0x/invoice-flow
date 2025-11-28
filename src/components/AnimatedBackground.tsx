import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-background" />
      
      {/* Large glowing purple orb - top left */}
      <motion.div
        className="absolute -top-1/3 -left-1/4 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(280, 90%, 60%) 0%, hsl(280, 90%, 50%) 20%, transparent 60%)",
          filter: "blur(60px)",
          opacity: 0.4,
        }}
        animate={{
          x: [0, 150, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Pink/Magenta glowing orb - bottom right */}
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 w-[900px] h-[900px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(320, 85%, 60%) 0%, hsl(320, 85%, 50%) 20%, transparent 60%)",
          filter: "blur(60px)",
          opacity: 0.5,
        }}
        animate={{
          x: [0, -120, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Center purple orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(260, 80%, 55%) 0%, hsl(280, 90%, 60%) 30%, transparent 65%)",
          filter: "blur(50px)",
          opacity: 0.3,
        }}
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Noise overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
