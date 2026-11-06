import React from 'react';
import { motion } from 'framer-motion';

export default function Hover3DButton({ onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ rotateY: 6, backgroundColor: '#eab308' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="mt-4 px-5 py-2 bg-primary text-white rounded-full shadow-md"
    >
      {children}
    </motion.button>
  );
}
