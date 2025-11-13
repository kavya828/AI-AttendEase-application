import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FacultyCard from '../components/FacultyCard';
import { faculty } from '../data/mockData';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

// ✅ FIXED: Moved getFacultyHistory OUTSIDE the component
function getFacultyHistory(facultyId) {
  // Demo/mock: always return some records
  return [
    { date: "2025-11-01", status: "Present" },
    { date: "2025-11-02", status: "Absent" },
    { date: "2025-11-03", status: "Present" }
  ];
}

export default function FacultyList() {
  // ✅ useNavigate hook is ONLY here in the component
  const [query, setQuery] = useState('');
  
  const filteredFaculty = faculty.filter(
    f =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.dept.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
  <motion.main
    className="flex-1 flex flex-col items-center px-1 sm:px-4 py-5 sm:py-10 z-10 relative"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', delay: 0.15, bounce: 0.45 }}
  >
    {/* Back Button */}
    <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-7xl mb-3 sm:mb-6 flex justify-start">
      <BackButton to="/" label="← Back to Home" />
    </div>
    <h2 className="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-8 text-gray-700">
      Faculty Attendance Management
    </h2>
    <SearchBar
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search faculty by name or department"
      className="max-w-xs sm:max-w-xl mb-5 sm:mb-10"
    />
    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 max-w-xs sm:max-w-7xl w-full">
      {filteredFaculty.length > 0 ? (
        filteredFaculty.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <FacultyCard
              faculty={f}
              getFacultyHistory={getFacultyHistory}
            />
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500 text-base sm:text-xl mt-8 sm:mt-12">
          No faculty found matching "{query}".
        </p>
      )}
    </div>
  </motion.main>
</div>

  );
}
