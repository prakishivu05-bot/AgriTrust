import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', highlight = false, onClick, ...props }) => {
  return (
    <motion.div 
      whileHover={{ scale: onClick ? 1.02 : 1, y: onClick ? -2 : 0 }}
      whileTap={{ scale: onClick ? 0.98 : 1 }}
      onClick={onClick}
      className={`bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border transition-colors duration-300 
      ${highlight 
        ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-900/10' 
        : 'border-gray-100 dark:border-gray-700'} 
      ${onClick ? 'cursor-pointer hover:shadow-md dark:shadow-gray-900' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
