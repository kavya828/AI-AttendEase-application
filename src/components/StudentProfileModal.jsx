import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertCircle, Camera } from 'lucide-react';
import { useAttendance } from '../context/AttendanceContext';
import { useState } from 'react';

export default function StudentProfileModal({ 
  student, 
  classId, 
  isOpen, 
  onClose, 
  onMarkAttendance 
}) {
  const { getStudentHistory } = useAttendance();
  const [filterTab, setFilterTab] = useState('all');
  
  if (!student) return null;

  const history = getStudentHistory(student.id);
  const presentCount = history.filter(h => h.status === 'Present').length;
  const absentCount = history.filter(h => h.status === 'Absent').length;
  const totalDays = history.length || 1;
  const attendancePercentage = Math.round((presentCount / totalDays) * 100) || 0;

  const filteredHistory = history.filter(record => {
    if (filterTab === 'present') return record.status === 'Present';
    if (filterTab === 'absent') return record.status === 'Absent';
    return true;
  }).reverse();

  return (
    <AnimatePresence>
      {isOpen && (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
  onClick={onClose}
>
  <motion.div
    initial={{ scale: 0.9, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.9, opacity: 0, y: 20 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    onClick={(e) => e.stopPropagation()}
    className="bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-xs sm:max-w-2xl w-full p-3 sm:p-8 relative my-4 sm:my-8"
  >
    {/* Close Button */}
    <button
      onClick={onClose}
      className="absolute top-3 right-3 sm:top-6 sm:right-6 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition"
    >
      <X size={18} className="sm:size-[24px] text-gray-600" />
    </button>
    {/* Title */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-3">
      <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
        Your Attendance Marker
      </h1>
      <button 
        onClick={() => {
          onClose();
          onMarkAttendance(student);
        }}
        className="text-indigo-600 font-semibold flex items-center gap-1 sm:gap-2 text-xs sm:text-base hover:underline"
      >
        <span>View</span>
        <span className="text-lg sm:text-xl">&#8594;</span>
      </button>
    </div>
    {/* Main Content - Two Columns */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
      {/* Left Column */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        {/* Profile */}
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <img
            src={student.photo}
            alt={student.name}
            className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-2 sm:border-4 border-indigo-300 shadow-lg mb-2 sm:mb-4"
          />
          <h2 className="text-base sm:text-xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-mono">ID: {student.id}</p>
        </div>
        {/* Attendance Percentage */}
        <div className="bg-gradient-to-br from-red-50 via-white to-pink-100 rounded-lg sm:rounded-2xl p-3 sm:p-6 border border-red-200 text-center">
          <p className="text-xs sm:text-base text-gray-700 font-semibold mb-1 sm:mb-2 flex gap-1 items-center justify-center">
            <TrendingUp size={14} className="sm:size-[20px] text-pink-400" />
            Attendance Percentage
          </p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-3xl sm:text-5xl font-extrabold text-red-600 mb-2 sm:mb-4"
          >
            {attendancePercentage}%
          </motion.div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden mb-1 sm:mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${attendancePercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className={`h-full rounded-full ${
                attendancePercentage >= 80 ? 'bg-green-500' :
                attendancePercentage >= 60 ? 'bg-yellow-400' : 'bg-red-500'
              }`}
            />
          </div>
          {/* Warning */}
          {attendancePercentage < 80 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-200 text-red-800 mt-2 sm:mt-4 rounded-lg p-2 sm:p-3 text-xs sm:text-sm font-semibold flex items-start gap-1 sm:gap-2"
            >
              <AlertCircle size={14} className="sm:size-[18px] flex-shrink-0 mt-0.5" />
              <span>
                To successfully complete this semester, a minimum attendance of 80% is required.
              </span>
            </motion.div>
          )}
        </div>
        {/* Mark Attendance Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            onClose();
            onMarkAttendance(student);
          }}
          className="w-full mt-3 sm:mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-xs sm:text-lg py-2 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-lg transition flex items-center justify-center gap-1 sm:gap-2"
        >
          <Camera size={16} className="sm:size-[20px]" />
          Mark Attendance
        </motion.button>
        {/* Need Help */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-2 sm:mt-3 border-2 border-indigo-600 text-indigo-600 text-xs sm:text-base py-1.5 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-indigo-50 transition"
        >
          Need help?
        </motion.button>
      </motion.div>
      {/* Right Column - Attendance History with Tabs */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        {/* Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-4 bg-gray-100 p-0.5 sm:p-1 rounded-md sm:rounded-lg">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterTab('all')}
            className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-md font-semibold transition text-xs sm:text-sm ${
              filterTab === 'all'
                ? 'bg-white text-indigo-600 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterTab('present')}
            className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-md font-semibold transition text-xs sm:text-sm ${
              filterTab === 'present'
                ? 'bg-green-100 text-green-700 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Present ({presentCount})
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterTab('absent')}
            className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-md font-semibold transition text-xs sm:text-sm ${
              filterTab === 'absent'
                ? 'bg-red-100 text-red-700 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Absent ({absentCount})
          </motion.button>
        </div>
        {/* Attendance History List */}
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-4 max-h-40 sm:max-h-96 overflow-y-auto border border-gray-200">
          {filteredHistory.length === 0 ? (
            <p className="text-center text-gray-500 py-6 sm:py-8">
              No records found
            </p>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              {filteredHistory.map((record, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex justify-between items-center p-2 sm:p-3 rounded-lg font-medium text-xs sm:text-sm ${
                    record.status === 'Present'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <span className="font-semibold">{record.date}</span>
                  <span className={`px-2 sm:px-3 py-[2px] sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                    record.status === 'Present'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-green-600">{presentCount}</p>
            <p className="text-[10px] sm:text-xs text-green-700 font-semibold">Present</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-red-600">{absentCount}</p>
            <p className="text-[10px] sm:text-xs text-red-700 font-semibold">Absent</p>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</motion.div>


      )}
    </AnimatePresence>
  );
}
