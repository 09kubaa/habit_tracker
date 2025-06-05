import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function HabitEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habit, setHabit] = useState({
    name: "",
    description: "",
    frequency: "daily",
  });

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await API.get(`/habits`);
        const toEdit = res.data.find((h) => h._id === id);
        if (toEdit) setHabit(toEdit);
        else navigate("/");
      } catch {
        navigate("/");
      }
    };
    fetchHabit();
  }, [id, navigate]);

  const handleChange = (e) => {
    setHabit({ ...habit, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.patch(`/habits/${id}`, habit);
      navigate("/");
    } catch {
      alert("Błąd podczas aktualizacji.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edytuj nawyk</h2>
      <input
        name="name"
        value={habit.name}
        onChange={handleChange}
        required
        placeholder="Nazwa"
      />
      <input
        name="description"
        value={habit.description}
        onChange={handleChange}
        placeholder="Opis"
      />
      <select
        name="frequency"
        value={habit.frequency}
        onChange={handleChange}
        required
      >
        <option value="daily">Codziennie</option>
        <option value="weekly">Co tydzień</option>
        <option disabled>────────────</option>
        <option value="monday">Poniedziałek</option>
        <option value="tuesday">Wtorek</option>
        <option value="wednesday">Środa</option>
        <option value="thursday">Czwartek</option>
        <option value="friday">Piątek</option>
        <option value="saturday">Sobota</option>
        <option value="sunday">Niedziela</option>
      </select>
      <button type="submit">Zapisz zmiany</button>
    </form>
  );
}
