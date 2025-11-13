import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col relative">
  {/* Buttons Top-Right */}
  <div className="absolute top-2 sm:top-0 right-2 sm:right-0 p-2 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-5 z-50">
    <motion.button
      whileHover={{ scale: 1.07, boxShadow: "0 8px 24px rgba(99,102,241,0.20)" }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate("/login")}
      className="flex items-center gap-1 sm:gap-2 px-4 sm:px-7 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-sm sm:text-lg shadow-lg hover:from-indigo-600 hover:to-pink-600 transition-all"
    >
      <LogIn size={16} className="sm:size-[20px]" />
      Log In
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.07, boxShadow: "0 8px 24px rgba(16,185,129,0.17)" }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate("/register")}
      className="flex items-center gap-1 sm:gap-2 px-4 sm:px-7 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 text-white font-bold text-sm sm:text-lg shadow-lg hover:from-green-600 hover:to-cyan-700 transition-all"
    >
      <UserPlus size={16} className="sm:size-[20px]" />
      Register
    </motion.button>
  </div>

  {/* Main Central Content */}
  <div className="flex flex-col flex-1 items-center justify-center pt-24 sm:pt-32 pb-6 sm:pb-10 px-2">
    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
      className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2 sm:mb-4 text-center"
    >
      Welcome to Smart Attendance System
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-gray-600 text-xs sm:text-lg mb-5 sm:mb-12 text-center max-w-full sm:max-w-2xl"
    >
      Seamlessly manage student and faculty attendance with modern technology and intuitive design.
    </motion.p>
    {/* Cards */}
    <div className="flex flex-col md:flex-row gap-4 sm:gap-8 md:gap-12 mb-3 sm:mb-6 px-1">
      {/* Student Card */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(99, 102, 241, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/students")}
        className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 w-64 sm:w-80 flex flex-col items-center text-center transition-all duration-300 border-2 border-transparent hover:border-indigo-400"
      >
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg group-hover:shadow-indigo-400/50 transition-shadow">
          <GraduationCap size={40} className="sm:size-[56px] text-white" />
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">Students</h2>
        <p className="text-xs sm:text-gray-600 sm:mb-6 mb-2">
          View and manage student attendance with ease
        </p>
        <div className="flex items-center gap-1 sm:gap-2 text-indigo-600 font-semibold group-hover:gap-2 sm:group-hover:gap-4 transition-all">
          <span>Get Started</span>
          <ArrowRight size={16} className="sm:size-[20px] group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
      {/* Faculty Card */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(236, 72, 153, 0.3)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/faculty")}
        className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 w-64 sm:w-80 flex flex-col items-center text-center transition-all duration-300 border-2 border-transparent hover:border-pink-400"
      >
        <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg group-hover:shadow-pink-400/50 transition-shadow">
          <Users size={40} className="sm:size-[56px] text-white" />
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-3">Faculty</h2>
        <p className="text-xs sm:text-gray-600 sm:mb-6 mb-2">
          Monitor faculty attendance and generate reports
        </p>
        <div className="flex items-center gap-1 sm:gap-2 text-pink-600 font-semibold group-hover:gap-2 sm:group-hover:gap-4 transition-all">
          <span>Get Started</span>
          <ArrowRight size={16} className="sm:size-[20px] group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </div>
    {/* Footer Note */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="mt-5 sm:mt-14 text-gray-500 text-xs sm:text-sm text-center"
    >
      Powered by modern AI & cloud technology
    </motion.div>
  </div>
</div>

  );
};

export default Home;
