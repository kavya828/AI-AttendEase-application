import { motion } from 'framer-motion';

export default function Spinner() {
  return (
    <motion.div
      className="flex items-center justify-center h-16"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }}
    >
      <div className="w-12 h-12 rounded-full border-[6px] border-r-purple-400 border-b-transparent border-t-blue-400 border-l-indigo-300 animate-spin" />
    </motion.div>
  );
}
