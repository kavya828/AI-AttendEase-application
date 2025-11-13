import { Building2, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
  className="sticky top-0 bg-indigo-700/95 backdrop-blur-md text-white flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-3 shadow-2xl z-50 border-b border-indigo-500/50"
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: "spring", stiffness: 120, damping: 20 }}
>
  <div className="flex items-center gap-2 sm:gap-4">
    <motion.button 
      className="lg:hidden p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all focus:outline-none"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle navigation menu"
    >
      <Menu size={20} className="sm:size-[24px] text-white" />
    </motion.button>
    <motion.h1 
      className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 drop-shadow-lg"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", delay: 0.1 }}
    >
      DSE – FRS
    </motion.h1>
  </div>
  <motion.div
    className="flex items-center gap-1 sm:gap-2 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", delay: 0.2 }}
  > 
    <Building2 size={16} className="sm:size-[20px] text-white" />
    <span className="text-xs sm:text-sm md:text-base font-medium text-white">DSE Faculty</span>
  </motion.div>
</motion.header>

  );
} 
