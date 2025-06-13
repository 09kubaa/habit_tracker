import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./styles/App.css";
import HabitEditForm from "./components/HabitEditForm";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <AuthProvider>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<HabitList />} />
            <Route path="/add" element={<HabitForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/edit/:id" element={<HabitEditForm />} />

            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
