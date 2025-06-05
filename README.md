# 🧘 Habit Tracker – Fullstack App (MERN)

Aplikacja do śledzenia nawyków z logowaniem użytkowników, REST API, autoryzacją i bazą danych MongoDB.

---

## 🚀 Technologie

- **Frontend**: React, React Router, Axios
- **Backend**: Express, MongoDB (Mongoose), JWT, bcrypt
- **Walidacja**: Joi / Express-validator
- **Autoryzacja**: Token JWT
- **Zabezpieczenia**: Hashowanie haseł, middleware JWT

---

## 📁 Struktura projektu

NAZWA_PROJEKTU/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Komponenty UI (logowanie, rejestracja, habit list, logowanie nawyków)
│ │ ├── App.js
│ │ └── index.js
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── index.js
│ └── .env

---

## 🔐 Funkcjonalności

- ✅ Rejestracja i logowanie z JWT
- ✅ CRUD na nawykach
- ✅ Logowanie wykonania nawyku (habit logs)
- ✅ Historia wykonanych nawyków
- ✅ Walidacja danych po stronie klienta i serwera
- ✅ Ochrona tras z middleware
- ✅ Oddzielny frontend/backend

---

## 🛠️ Instalacja

### 📦 Backend (Express)
```bash
cd server
npm install
cp .env.example .env
npm run dev
