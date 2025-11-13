import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, User, Lock, Users } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      login(email, password, role);
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (er) {
      setError(er.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-green-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border-2 border-indigo-100 p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <LogIn className="text-indigo-500" size={40} />
          <h2 className="text-3xl font-extrabold text-indigo-700 mt-2">
            System Login
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-center border border-red-300 transition-all duration-300">
            {error}
          </div>
        )}

        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            autoComplete="username"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div className="relative mb-6">
          <Users className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition cursor-pointer"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-lg transition-all shadow-lg mb-4"
        >
          LOG IN
        </button>

        <p className="mt-2 text-center text-gray-600 text-sm">
          No account?
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:text-indigo-700 ml-1 underline"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
