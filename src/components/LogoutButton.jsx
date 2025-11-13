// src/components/LogoutButton.jsx
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton({ extraClass = "" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
  onClick={handleLogout}
  className={`flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-xs sm:text-sm font-bold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow transition ${extraClass}`}
>
  <LogOut size={14} className="sm:size-[18px]" />
  Logout
</button>

  );
}
