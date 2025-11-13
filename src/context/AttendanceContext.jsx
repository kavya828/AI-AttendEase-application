// src/context/AttendanceContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const AttendanceContext = createContext();
const STORAGE_KEY = "dailyAttendanceRecords";

const getTodayDate = () => new Date().toISOString().slice(0, 10);

export function AttendanceProvider({ children }) {
    const [records, setRecords] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }, [records]);

    const getClassAttendance = (classId, date = getTodayDate()) => {
        const key = `${date}-${classId}`;
        return records[key] || {};
    };

    const updateStudentAttendance = (classId, studentId, status, date = getTodayDate()) => {
        const key = `${date}-${classId}`;

        setRecords(prevRecords => {
            const currentClassRecords = prevRecords[key] || {};
            
            const newRecords = { ...prevRecords };
            
            newRecords[key] = {
                ...currentClassRecords,
                [studentId]: status,
            };

            return newRecords;
        });
    };
    
    const getStudentHistory = (studentId) => {
        const history = [];
        for (const key in records) {
            const [date, clsId] = key.split('-');
            if (records[key][studentId] !== undefined) {
                history.push({
                    date: date,
                    status: records[key][studentId] ? 'Present' : 'Absent',
                    classId: clsId
                });
            }
        }
        return history;
    };

    const contextValue = {
        getClassAttendance,
        updateStudentAttendance,
        getStudentHistory, 
        getTodayDate,
    };

    return (
        <AttendanceContext.Provider value={contextValue}>
            {children}
        </AttendanceContext.Provider>
    );
}

export function useAttendance() {
    return useContext(AttendanceContext);
}