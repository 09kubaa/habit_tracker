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

  const validate = () => {
    const { firstName, lastName, email, password } = form;
    if (firstName.trim().length < 2)
      return "Imię musi mieć przynajmniej 2 znaki.";
    if (lastName.trim().length < 2)
      return "Nazwisko musi mieć przynajmniej 2 znaki.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Niepoprawny adres email.";
    if (password.length < 6) return "Hasło musi mieć przynajmniej 6 znaków.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

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
