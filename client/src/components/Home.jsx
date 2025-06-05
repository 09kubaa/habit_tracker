import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="home">
      <h1>🧘 Witamy w Habit Tracker</h1>
      <p>Wybierz jedną z opcji, aby rozpocząć:</p>
      <div className="home-cards">
        {!token && (
          <>
            <Link to="/login" className="card">
              🔑 Logowanie
            </Link>
            <Link to="/register" className="card">
              📝 Rejestracja
            </Link>
          </>
        )}
        <Link to="/" className="card">
          📋 Moje nawyki
        </Link>
      </div>
    </div>
  );
}
