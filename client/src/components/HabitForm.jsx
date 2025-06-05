import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function HabitForm() {
  const navigate = useNavigate();
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    frequency: "daily",
  });

  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/habits", habit);
      navigate("/");
    } catch {
      alert("Nie udało się dodać nawyku.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj nawyk</h2>
      <input name="name" placeholder="Nazwa" onChange={handleChange} required />
      <input name="description" placeholder="Opis" onChange={handleChange} />
      <select name="frequency" onChange={handleChange}>
        <option value="daily">Codziennie</option>
        <option value="weekly">Co tydzień</option>
        <option value="monday">Poniedziałek</option>
        <option value="tuesday">Wtorek</option>
        <option value="wednesday">Środa</option>
        <option value="thursday">Czwartek</option>
        <option value="friday">Piątek</option>
        <option value="saturday">Sobota</option>
        <option value="sunday">Niedziela</option>
      </select>

      <button type="submit">Zapisz</button>
    </form>
  );
}
