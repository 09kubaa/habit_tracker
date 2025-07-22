Habit Tracker – Fullstack App (MERN)
Aplikacja do śledzenia nawyków z systemem logowania, autoryzacją JWT, REST API oraz bazą danych MongoDB. Projekt oparty na architekturze klient-serwer (oddzielny frontend i backend). Dodaje deployment na bloba.

Technologie:
-Frontend: React, React Router, Axios
-Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
-Walidacja: Joi / Express-validator
-Autoryzacja: JWT
-Zabezpieczenia: Hashowanie haseł, middleware JWT

Funkcjonalności:
-Rejestracja i logowanie użytkowników (JWT)
-Operacje CRUD na nawykach
-Rejestrowanie wykonania nawyków (habit logs)
-Historia i statystyki wykonanych nawyków
-Walidacja danych po stronie klienta i serwera
-Ochrona tras backendowych (middleware)
-Oddzielna struktura frontend / backend
-Tryb jasny i ciemny UI

Instalacja i uruchomienie:

Wymagania:
-Node.js (v16+)
-npm (v8+)
-Lokalna instancja MongoDB lub MongoDB Atlas

Instalacja zależności:
Backend:
cd server
npm install

Frontend:
cd client
npm install

Uruchomienie:
Backend:
cd server
npm start # produkcyjnie
npm run dev # developersko (np. z nodemon)

Frontend:
cd client
npm start

Struktura projektu:
habit-tracker/
├── client/ # frontend (React)
└── server/ # backend (Express + MongoDB)
