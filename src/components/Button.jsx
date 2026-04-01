import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', ...props }) => {
  const baseStyle = "w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-sm transition-colors";
  
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 dark:shadow-emerald-900/50",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 dark:shadow-blue-900/50",
    outline: "border-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 shadow-none",
  };

  return (
    <motion.button 
      type={type}
      onClick={onClick} 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
