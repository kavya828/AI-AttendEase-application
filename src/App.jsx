// src/App.jsx (UPDATED for Context Integration)

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClassList from './pages/ClassList';
import StudentAttendance from './pages/StudentAttendance';
import Placeholder from './pages/Placeholder';
import NotFound from './pages/NotFound';
import StudentRegistration from './pages/StudentRegistration';
import FacultyList from './pages/FacultyList';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext'; // Existing
import { AttendanceProvider } from './context/AttendanceContext'; // NEW IMPORT
import StudentList from './pages/StudentList'; // NEW IMPORT
export default function App() {
  return (
    <AuthProvider>
      <AttendanceProvider> {/* WRAPPED HERE */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            
            
            <Route path="/faculty" element={
              <ProtectedRoute requiredRole="faculty">
                <FacultyList />
              </ProtectedRoute>
            } />
            
            <Route path="/students" element={
              <ProtectedRoute requiredRole="student">
                <ClassList />
              </ProtectedRoute>
            } />
            
            {/* The Dashboard component is used if you route to /dashboard */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            } />
            
            <Route path="/student-attendance" element={<ClassList />} />
            <Route path="/student-attendance/:classId" element={<StudentAttendance />} />
            <Route path="/staff-registration" element={<Placeholder title="Staff Registration" />} />
            <Route path="/staff-attendance" element={<Placeholder title="Staff Attendance" />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/detailed-report" element={<Placeholder title="Detailed Report" />} />
            <Route path="/duplicates" element={<Placeholder title="Duplicates" />} />
            <Route path="/logout" element={<Navigate to="/login" replace />} />
             <Route path="/students" element={<StudentList />} /> {/* ← ADD THIS */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AttendanceProvider>
    </AuthProvider>
  );
}