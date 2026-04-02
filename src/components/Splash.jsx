import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import splashImage from '../assets/splash.avif';

const Splash = ({ onComplete }) => {
  const [isShattering, setIsShattering] = useState(false);
  const rows = 5;
  const cols = 5;

  // Shatter animation runs exactly after 3.5 seconds
  useEffect(() => {
    const shatterTimer = setTimeout(() => {
      setIsShattering(true);
    }, 3500);

    // Call onComplete exactly when shatter finishes (0.8s later)
    const leaveTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(shatterTimer);
      clearTimeout(leaveTimer);
    };
  }, [onComplete]);

  // Generate grid pieces that simulate the glass shatter
  const gridPieces = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      gridPieces.push({ r, c, id: `${r}-${c}` });
    }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center flex-col"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        
        {/* The full screen container waiting to shatter */}
        <div className="absolute inset-0 w-full h-full perspective-[1000px]">
          {gridPieces.map((p) => {
            // Calculate random physics trajectories
            const explodeX = (p.c - cols / 2 + 0.5) * (Math.random() * 80 + 40);
            const explodeY = (p.r - rows / 2 + 0.5) * (Math.random() * 80 + 40);
            const explodeZ = Math.random() * 500 + 200;
            const rotateX = Math.random() * 180 - 90;
            const rotateY = Math.random() * 180 - 90;
            const rotateZ = Math.random() * 180 - 90;
            
            return (
              <motion.div
                key={p.id}
                className="absolute"
                style={{
                  top: `${(p.r / rows) * 100}%`,
                  left: `${(p.c / cols) * 100}%`,
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                  backgroundImage: `url(${splashImage})`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${(p.c / (cols - 1)) * 100}% ${(p.r / (rows - 1)) * 100}%`,
                  // Optional: add glassmorphism gloss to each shard
                  boxShadow: isShattering ? "inset 0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(0,255,150,0.5)" : "none",
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 1, 
                  z: 100 
                }}
                animate={isShattering ? {
                  opacity: 0,
                  x: `${explodeX}vw`,
                  y: `${explodeY}vh`,
                  z: explodeZ,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  rotateZ: rotateZ,
                  scale: Math.random() * 0.5 + 0.5,
                } : {
                  opacity: 1, 
                  scale: 1, 
                  z: 0 
                }}
                transition={{
                  duration: isShattering ? 0.8 : 1.2,
                  ease: isShattering ? [0.25, 1, 0.5, 1] : "easeOut",
                  delay: isShattering ? Math.random() * 0.1 : p.c * 0.05 + p.r * 0.05,
                }}
              />
            );
          })}
        </div>

        {/* Text/Logo Overlay that fades out before shatter */}
        <motion.div 
          className="relative z-10 text-center pointer-events-none drop-shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isShattering ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4"
            animate={{ textShadow: ["0px 0px 0px rgba(0,255,150,0)", "0px 0px 40px rgba(0,255,150,0.8)", "0px 0px 0px rgba(0,255,150,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AgriTrust
          </motion.h1>
          <p className="text-xl md:text-2xl font-bold text-gray-200 uppercase tracking-widest">
            Future of Produce
          </p>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
};

export default Splash;
