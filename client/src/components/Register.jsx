import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users", form);
      navigate("/login");
    } catch (err) {
      setError("Rejestracja nie powiodła się.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rejestracja</h2>
      <input
        name="firstName"
        placeholder="Imię"
        onChange={handleChange}
        required
      />
      <input
        name="lastName"
        placeholder="Nazwisko"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Hasło"
        onChange={handleChange}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Zarejestruj</button>
    </form>
  );
}
