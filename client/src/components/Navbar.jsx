import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png"; // ← ścieżka do logo

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">
        <img src={logo} alt="Habit Tracker logo" />
        <span class="habit_tracker">Habit Tracker</span>
      </Link>
      <ul>
        {token ? (
          <>
            <li>
              <Link to="/">Nawyki</Link>
            </li>
            <li>
              <Link to="/add">Dodaj</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Wyloguj</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Logowanie</Link>
            </li>
            <li>
              <Link to="/register">Rejestracja</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
