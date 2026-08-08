# AI Resume Interview App

A full-stack application for resume-based interview preparation and AI-assisted evaluation. The project includes a Node.js/Express backend for authentication, interview logic, MongoDB storage, and Gemini-powered interview report generation, plus a React + Vite frontend for the user experience.

## Features

- User registration and login
- Protected interview routes
- Resume and job description input flow
- AI-generated interview analysis using Google Gemini
- MongoDB-backed data persistence
- React frontend with route-based navigation

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- Cookie-based auth
- Google GenAI integration
- Multer and PDF parsing support

### Frontend
- React 19
- Vite
- React Router
- Axios
- SCSS styling

## Project Structure

```text
airesume-interview/
├── Backend/
│   ├── src/
│   ├── data/
│   ├── .env
│   ├── package.json
│   └── server.js
├── Fronted/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── README.md
└── .gitignore
```

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- npm installed
- MongoDB running locally or a valid MongoDB connection string
- A Google API key for Gemini access

## Setup

### 1) Backend

Open a terminal in the Backend folder:

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend` with values similar to:

```env
MONGO_URI=mongodb://127.0.0.1:27017/airesume
GOOGLE_API_KEY=your_google_api_key_here
PORT=3000
```

Then start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

### 2) Frontend

Open a second terminal in the Fronted folder:

```bash
cd Fronted
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Running the App

1. Start MongoDB.
2. Start the backend from `Backend`.
3. Start the frontend from `Fronted`.
4. Open the frontend URL in the browser.

## Important Notes

- The backend config enables CORS for `http://localhost:5173`.
- If `GOOGLE_API_KEY` is not set, the app will fall back to a local mock interview report.
- Authentication uses cookies and JWTs, so the frontend must send credentials when calling protected APIs.

## Common Commands

### Backend
```bash
cd Backend
npm install
npm run dev
npm start
```

### Frontend
```bash
cd Fronted
npm install
npm run dev
npm run build
```

## License

This project currently uses the ISC license as defined in the backend package configuration.
