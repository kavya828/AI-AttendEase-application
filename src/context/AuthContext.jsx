import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem(USERS_KEY);
    return local
      ? JSON.parse(local)
      : [
          { email: "admin@demo.com", password: "admin123", role: "admin" },
          { email: "faculty@demo.com", password: "faculty123", role: "faculty" },
          { email: "student@demo.com", password: "student123", role: "student" },
        ];
  });

  useEffect(() => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const login = (email, password, role) => {
    if (!email || !password || !role)
      throw new Error("All fields are required");
    const found = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );
    if (!found) throw new Error("Invalid email, password or role");
    setUser(found);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(found));
  };

  const register = (email, password, role) => {
    if (!email || !password || !role)
      throw new Error("All fields are required");
    if (!/^\S+@\S+$/.test(email))
      throw new Error("Invalid email format");
    if (password.length < 5)
      throw new Error("Password must be at least 5 characters.");
    if (users.some((u) => u.email === email))
      throw new Error("User already exists");
    const newUser = { email, password, role };
    setUsers((prev) => [...prev, newUser]);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
