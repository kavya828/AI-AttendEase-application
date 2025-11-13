// src/pages/Dashboard.jsx (FIXED CODE)
import { useAuth } from "../context/AuthContext";
import FacultyList from "./FacultyList";
import ClassList from "./ClassList";
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role === 'faculty') {
        return <FacultyList />; 
    }
    if (user.role === 'student') {
        return <ClassList />; 
    }

    return (
       
  <div className="flex justify-center items-center min-h-screen bg-gray-50 px-2 sm:px-0">
    <p className="text-base sm:text-xl text-red-500 text-center">Welcome, {user.email}. Role not mapped to a view.</p>
  </div>
);


}