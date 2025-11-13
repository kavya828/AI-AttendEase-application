import { motion } from 'framer-motion';

export default function SparkleOverlay({ count = 24 }) {
  return (
    <div className="pointer-events-none z-0 absolute inset-0">
  {Array.from({ length: count }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gradient-to-tr from-purple-300 via-indigo-300 to-blue-200 shadow-lg"
      initial={{
        x: Math.random() * 1000,
        y: Math.random() * 800,
        opacity: 0.6,
      }}
      animate={{
        x: [null, Math.random() * 1000],
        y: [null, Math.random() * 800],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        repeat: Infinity,
        duration: 8 + Math.random() * 4,
        ease: "circInOut",
      }}
    />
  ))}
</div>

  );
}
