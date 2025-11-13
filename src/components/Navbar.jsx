import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav style={{ padding:8, background:"#6875F5", color:"#fff", marginBottom:12, display:"flex", gap:12 }}>
      <button onClick={()=>navigate("/")} style={{ background:"none", color:"#fff" }}>Home</button>
      {user && <>
        <button onClick={()=>navigate("/dashboard")}>Dashboard</button>
        <button onClick={()=>{ logout(); navigate("/login") }}>Logout</button>
      </>}
      {!user && <>
        <button onClick={()=>navigate("/login")}>Login</button>
        <button onClick={()=>navigate("/register")}>Register</button>
      </>}
    </nav>
  );
}
