import Header from '../components/Header';
import ClassCard from '../components/ClassCard';
import SearchBar from '../components/SearchBar';
import { classes } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SparkleOverlay from '../components/SparkleOverlay';
import BackButton from '../components/BackButton'; 

export default function ClassList() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const filtered = classes.filter(
    c => c.name.toLowerCase().includes(query.toLowerCase()) || String(c.total).includes(query)
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-white relative overflow-hidden">
  <SparkleOverlay count={18}/>
  <motion.main
    className="flex-1 flex flex-col items-center px-1 sm:px-2 py-5 sm:py-10 z-10 relative"
    initial={{ opacity: 0, scale: 0.97, y: 30 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: 'spring', delay: 0.19, bounce: 0.45 }}
  >
    <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-7xl mb-3 sm:mb-6 flex justify-start">
      <BackButton to="/" label="← Back to Home" />
    </div>
    <h2 className="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400">
      Student Attendance
    </h2>
    <SearchBar
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search by class name"
    />
    <motion.div 
      className="w-full max-w-xs sm:max-w-lg space-y-3 sm:space-y-6 mt-4 sm:mt-8"
      initial="hidden"
      animate="visible"
    >
      {filtered.map((cls, i) => (
        <motion.div
          key={cls.id}
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: i * 0.12, duration: 0.6, type: "spring" }}
        >
          <ClassCard
            cls={cls}
            onClick={() => navigate(`/student-attendance/${cls.id}`)}
          />
        </motion.div>
      ))}
    </motion.div>
  </motion.main>
  <footer className="text-right text-[10px] sm:text-xs text-gray-400 py-1 sm:py-2 px-2 sm:px-4 z-10 relative">
    V 1.0.6
  </footer>
</div>

  );
}
