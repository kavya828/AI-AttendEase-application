import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import StudentCard from '../components/StudentCard';
import BackButton from '../components/BackButton';
import { students } from '../data/mockData';
import { motion } from 'framer-motion';

// Function outside component (no hooks)
function getStudentHistory(studentId) {
  return [
    { date: "2025-11-01", status: "Present" },
    { date: "2025-11-02", status: "Absent" },
    { date: "2025-11-03", status: "Present" },
    { date: "2025-11-04", status: "Present" }
  ];
}

export default function StudentList() {
  const [query, setQuery] = useState('');

  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.dept.toLowerCase().includes(query.toLowerCase())
  );

  return (
   <div className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-purple-100 relative">
  <SparkleOverlay count={15} />
  <motion.main
    className="flex-1 flex flex-col items-center px-1 sm:px-2 pt-3 sm:pt-6 pb-6 sm:pb-10 z-10 relative"
    initial={{ opacity: 0, scale: 0.95, y: 40 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", bounce: 0.5 }}
  >
    {/* Back Button */}
    <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mb-3 sm:mb-6 flex justify-start px-0 sm:px-2">
      <BackButton to="/" label="← Back to Home" />
    </div>
    <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-xl sm:rounded-3xl max-w-xs sm:max-w-4xl w-full mx-auto px-3 sm:px-8 py-4 sm:py-6 relative z-20">
      {/* Header */}
      <div className="flex w-full flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 px-0 sm:px-2 gap-2">
        <span className="text-lg sm:text-2xl font-bold text-gray-900">
          Student List
        </span>
        {/* Add stats here if needed */}
      </div>
      {/* Search Bar */}
      <SearchBar
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search Student"
      />
      {/* Student Cards Grid */}
      {loading ? (
        <div className="flex py-10 sm:py-16 justify-center">
          <Spinner />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-3 sm:mt-6">
            {filteredStudents.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ delay: i * 0.08, type: "spring" }}
              >
                <StudentCard
                  student={s}
                  getStudentHistory={getStudentHistory}
                  // other props...
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  </motion.main>
  <footer className="text-right text-[10px] sm:text-xs text-gray-400 py-1 sm:py-2 px-2 sm:px-4 z-20">
    V 1.0.8
  </footer>
</div>


  );
}
