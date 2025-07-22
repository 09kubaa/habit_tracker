import { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const [completedToday, setCompletedToday] = useState({});
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const navigate = useNavigate();

  const frequencyLabels = {
    daily: "Codziennie",
    weekly: "Co tydzień",
    monday: "Poniedziałek",
    tuesday: "Wtorek",
    wednesday: "Środa",
    thursday: "Czwartek",
    friday: "Piątek",
    saturday: "Sobota",
    sunday: "Niedziela",
  };

  const fetchHabits = async () => {
    try {
      const res = await API.get("/habits");
      setHabits(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchLogsForToday = async (habits) => {
    const today = new Date().toISOString().split("T")[0];
    const status = {};

    for (const habit of habits) {
      try {
        const res = await API.get(`/habits/${habit._id}/logs`);
        const match = res.data.find((log) =>
          new Date(log.date).toISOString().startsWith(today)
        );
        status[habit._id] = !!match;
      } catch {
        status[habit._id] = false;
      }
    }

    setCompletedToday(status);
  };

  const logHabit = async (habitId) => {
    try {
      const isCompleted = completedToday[habitId];

      if (isCompleted) {
        await API.delete(`/habits/${habitId}/log`);
      } else {
        await API.post(`/habits/${habitId}/log`);
      }

      await fetchLogsForToday(habits);
    } catch {
      alert("Błąd podczas aktualizacji logu.");
    }
  };

  const deleteHabit = async (id) => {
    if (!window.confirm("Na pewno usunąć?")) return;
    await API.delete(`/habits/${id}`);
    await fetchHabits();
  };

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  useEffect(() => {
    if (habits.length > 0) {
      fetchLogsForToday(habits);
    }
  }, [habits]);

  const todayDay = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  const filteredHabits = habits.filter((habit) => {
    if (!showTodayOnly) return true;
    return habit.frequency === "daily" || habit.frequency === todayDay;
  });

  const groupedHabits = filteredHabits.reduce((acc, habit) => {
    const freq = habit.frequency;
    if (!acc[freq]) acc[freq] = [];
    acc[freq].push(habit);
    return acc;
  }, {});

  const totalToday = filteredHabits.length;
  const completedCount = filteredHabits.filter(
    (h) => completedToday[h._id]
  ).length;

  return (
    <div>
      <h2 class="nawyki">Twoje nawyki</h2>
      <h2 className="add-habit">
        <Link to="/add">➕ Dodaj nowy nawyk</Link>
      </h2>
      <ProgressBar total={totalToday} completed={completedCount} />

      <label style={{ display: "block", marginTop: "1rem" }}>
        <input
          type="checkbox"
          checked={showTodayOnly}
          onChange={(e) => setShowTodayOnly(e.target.checked)}
        />{" "}
        Pokaż tylko dzisiejsze nawyki
      </label>

      {Object.keys(frequencyLabels).map((freqKey) => {
        const group = groupedHabits[freqKey];
        if (!group || group.length === 0) return null;

        return (
          <div key={freqKey}>
            <h3 style={{ marginTop: "2rem" }}>{frequencyLabels[freqKey]}</h3>
            <ul>
              {group.map((habit) => (
                <li
                  key={habit._id}
                  className={completedToday[habit._id] ? "completed" : ""}
                >
                  <span>
                    <strong>{habit.name}</strong> – {habit.description}
                  </span>
                  <div>
                    <button onClick={() => logHabit(habit._id)}>
                      ✔️ Wykonano
                    </button>
                    <button onClick={() => navigate(`/edit/${habit._id}`)}>
                      ✏️ Edytuj
                    </button>
                    <button onClick={() => deleteHabit(habit._id)}>
                      🗑 Usuń
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
