import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertCircle, Camera } from 'lucide-react';
import { useState } from 'react';
import FacultyAttendanceMarkerModal from './FacultyAttendanceMarkerModal';

export default function FacultyProfileModal({
  faculty,
  isOpen,
  onClose,
  onMarkAttendance,
  getFacultyHistory = () => []
}) {
  const [filterTab, setFilterTab] = useState('all');
  const [cameraModalOpen, setCameraModalOpen] = useState(false); // ← ADD THIS

  if (!faculty) return null;

  const history = typeof getFacultyHistory === 'function' 
    ? getFacultyHistory(faculty.id)
    : [];

  const presentCount = history.filter(h => h.status === 'Present').length;
  const absentCount = history.filter(h => h.status === 'Absent').length;
  const totalDays = history.length || 1;
  const attendancePercentage = Math.round((presentCount / totalDays) * 100) || 0;

  const filteredHistory = history.filter(record => {
    if (filterTab === 'present') return record.status === 'Present';
    if (filterTab === 'absent') return record.status === 'Absent';
    return true;
  }).reverse();

  const handleMarkAttendanceClick = () => {
    setCameraModalOpen(true); // ← OPEN CAMERA
  };

  const handleCameraCapture = () => {
    setCameraModalOpen(false); // ← CLOSE AFTER CAPTURE
    alert(`Attendance marked for ${faculty.name}`);
  };

  return (
    <>
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
    initial={{ scale: 0.97, opacity: 0, y: 24 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.95, opacity: 0, y: 32 }}
    transition={{ type: "spring", stiffness: 300, damping: 24 }}
    onClick={(e) => e.stopPropagation()}
    className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl mx-auto w-full max-w-xs sm:max-w-2xl my-4 sm:my-8 flex flex-col items-center"
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-100 hover:bg-indigo-200 text-gray-800 font-bold rounded-full p-1.5 sm:p-2 shadow transition z-10"
      aria-label="Close"
    >
      <X size={18} className="sm:size-[24px]" />
    </button>
    <div className="flex flex-col items-center pt-7 sm:pt-10 pb-2 sm:pb-3 w-full border-b">
      <img
        src={faculty.photo}
        alt={faculty.name}
        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border-2 sm:border-4 border-indigo-200 shadow-xl mb-1 sm:mb-2"
      />
      <h2 className="text-base sm:text-2xl font-bold text-gray-900">{faculty.name}</h2>
      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 mb-0.5 sm:mt-1 sm:mb-1">ID: {faculty.id}</div>
      <div className="text-xs sm:text-sm text-indigo-500 font-semibold mb-1 sm:mb-3">
        Dept: {faculty.dept || 'Staff'}
      </div>
    </div>

    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 py-2 sm:py-5 px-3 sm:px-6">
      <div>
        <div className="mb-2 sm:mb-4 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-inner text-center">
          <div className="flex items-center gap-1 sm:gap-2 justify-center mb-1 sm:mb-2">
            <TrendingUp size={16} className="sm:size-[22px] text-pink-400" />
            <span className="font-semibold text-xs sm:text-base text-gray-700">Attendance Percentage</span>
          </div>
          <div className="text-3xl sm:text-5xl font-extrabold text-indigo-600 mb-2 sm:mb-4 tracking-tight">{attendancePercentage}%</div>
          <div className="w-full mb-1 sm:mb-3">
            <div className="relative w-full h-2 sm:h-3 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full rounded-full ${
                  attendancePercentage >= 80
                    ? "bg-green-400"
                    : attendancePercentage >= 60
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
                style={{ width: `${attendancePercentage}%`, transition: "width 0.5s" }}
              />
            </div>
          </div>
          {attendancePercentage < 80 && (
            <div className="bg-red-100 text-red-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 mt-1 sm:mt-3">
              <AlertCircle size={13} className="sm:size-[18px]" />
              <span>To be in good standing, a minimum attendance of 80% is required.</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-green-600">{presentCount}</p>
            <p className="text-[10px] sm:text-xs text-green-700 font-semibold">Present</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-red-600">{absentCount}</p>
            <p className="text-[10px] sm:text-xs text-red-700 font-semibold">Absent</p>
          </div>
        </div>
        <button
          onClick={handleMarkAttendanceClick}
          className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-sm flex items-center justify-center gap-1 sm:gap-2 hover:shadow-lg transition"
        >
          <Camera size={16} className="sm:size-[21px]" />
          Mark Attendance
        </button>
      </div>
      <div>
        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-4 bg-gray-100 p-[2px] sm:p-1 rounded-xl w-full">
          {["all", "present", "absent"].map(tab => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg font-semibold transition text-xs sm:text-sm ${
                filterTab === tab
                  ? tab === "present"
                    ? "bg-green-100 text-green-700 shadow"
                    : tab === "absent"
                    ? "bg-red-100 text-red-700 shadow"
                    : "bg-white text-indigo-600 shadow"
                  : "text-gray-700 hover:text-indigo-800"
              }`}
            >
              {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "present" && ` (${presentCount})`}
              {tab === "absent" && ` (${absentCount})`}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-4 max-h-40 sm:max-h-80 overflow-y-auto border border-gray-200">
          {filteredHistory.length === 0 ? (
            <p className="text-center text-gray-400 py-6 sm:py-10">No records found</p>
          ) : (
            <div className="space-y-1 sm:space-y-2">
              {filteredHistory.map((record, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-2 sm:p-3 rounded-lg font-medium text-xs sm:text-sm ${
                    record.status === "Present"
                      ? "bg-green-50 border border-green-200 text-green-700"
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}
                >
                  <span className="font-semibold">{record.date}</span>
                  <span className={`px-2 sm:px-3 py-[2px] sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                    record.status === "Present"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
</motion.div>

        )}
      </AnimatePresence>

      {/* ← CAMERA MODAL NOW NESTED HERE */}
      <FacultyAttendanceMarkerModal
        faculty={faculty}
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />
    </>
  );
}
