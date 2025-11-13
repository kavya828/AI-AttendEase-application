// src/components/ToggleButton.jsx
import { motion } from 'framer-motion';

export default function ToggleButton({ value, onChange, leftLabel, rightLabel }) {
  return (
    <div className="relative p-0.5 sm:p-1 mb-2 sm:mb-4 bg-gray-100 rounded-lg sm:rounded-xl flex w-full max-w-xs sm:max-w-md mx-auto shadow-inner">
  <div 
    className={`absolute h-full rounded-lg sm:rounded-xl transition-all duration-300 ease-in-out ${value ? 'translate-x-full bg-indigo-600' : 'translate-x-0 bg-red-500'}`}
    style={{ width: '50%' }}
  >
    <motion.div 
      layout 
      className="absolute inset-0 rounded-lg sm:rounded-xl"
      transition={{ type: "spring", stiffness: 700, damping: 30 }}
    />
  </div>
  <button
    type="button"
    onClick={() => onChange(false)}
    className={`flex-1 z-10 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-colors duration-300 ${!value ? 'text-white' : 'text-gray-700 hover:text-red-600'}`}
  >
    {leftLabel}
  </button>
  <button
    type="button"
    onClick={() => onChange(true)}
    className={`flex-1 z-10 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl transition-colors duration-300 ${value ? 'text-white' : 'text-gray-700 hover:text-indigo-600'}`}
  >
    {rightLabel}
  </button>
</div>

  );
}