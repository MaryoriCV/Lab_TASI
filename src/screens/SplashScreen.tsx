import React from 'react';
import { motion } from 'motion/react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[100] bg-neo-orange flex flex-col items-center justify-center text-white"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl">
          <div className="w-12 h-12 bg-neo-orange rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">NeoBank</h1>
      </motion.div>
      
      <div className="absolute bottom-12 text-center">
        <p className="text-sm font-medium tracking-widest opacity-80">Tu banco digital seguro</p>
      </div>
    </motion.div>
  );
};
