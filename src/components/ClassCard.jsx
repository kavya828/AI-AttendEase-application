import { GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const colorMap = {
  1: { gradient: 'from-blue-500 to-indigo-600', iconBg: 'bg-blue-100', iconColor: 'text-blue-700' },
  2: { gradient: 'from-purple-500 to-pink-600', iconBg: 'bg-purple-100', iconColor: 'text-purple-700' },
  3: { gradient: 'from-green-500 to-teal-600', iconBg: 'bg-green-100', iconColor: 'text-green-700' },
  4: { gradient: 'from-orange-500 to-red-600', iconBg: 'bg-orange-100', iconColor: 'text-red-700' },
};

export default function ClassCard({ cls, onClick }) {
  const theme = colorMap[cls.id] || colorMap[1];

  return (
    <motion.div
  className={`flex items-center rounded-xl md:rounded-2xl p-3 md:p-5 shadow-2xl transition-all duration-300 cursor-pointer 
    bg-gradient-to-br ${theme.gradient} text-white 
    hover:scale-[1.02] hover:shadow-indigo-500/40`}
  onClick={onClick}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  <span className={`rounded-full p-2 md:p-3 shadow-inner mr-3 md:mr-5 ${theme.iconBg} ${theme.iconColor}`}>
    <GraduationCap size={22} className="md:size-[32px]" />
  </span>
  <div className="flex-1 min-w-0">
    <div className="text-xs md:text-sm font-light opacity-90">Class Name</div>
    <div className="text-base md:text-xl font-extrabold truncate drop-shadow-sm">{cls.name}</div>
    <div className="text-xs md:text-sm font-light mt-1">Total Students</div>
    <div className="text-lg md:text-2xl font-bold text-yellow-300">{cls.total}</div>
  </div>
  <ChevronRight size={20} className="md:size-[30px] ml-2 md:ml-3 text-white/70" />
</motion.div>

  );
}
