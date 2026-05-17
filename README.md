# Movie Library

A responsive React application for discovering and exploring movies. Users can search, filter, and save their favourite films — powered by the TMDB API.

---

## Features

- **Search:** Find movies using free-text search with built-in debounce to optimise API calls.
- **Filter & Sort:** Filter movies by genre and sort by popularity, title or release date.
- **Favourites:** Save and manage your favourite movies — persisted in the browser via `localStorage`.
- **Detail Pages:** View in-depth information about each film, including rating, cast, and official YouTube trailers.
- **Responsive Design:** Fully adapted for mobile, tablet and desktop.
- **Pagination:** Browse thousands of movies with smooth page navigation.

---

## Tech Stack

| Category         | Technology                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| Frontend         | [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)            |
| State Management | [Zustand](https://github.com/pmndrs/zustand)                              |
| Routing          | [React Router](https://reactrouter.com/)                                  |
| API              | [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api) |
| Styling          | CSS3 (Flexbox & Grid)                                                     |
| Icons            | [Lucide React](https://lucide.dev/)                                       |

---

## Requirements

Make sure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)
- A code editor — [VS Code](https://code.visualstudio.com/) is recommended
- A **TMDB API key**

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Nedim-Aydinci/Movie-app.git
cd movie-app
```

### 2. Install dependencies

```bash
npm install
npm install react-icons
```

### 3. Configure environment variables

Create a `.env` file in the root of the project and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

> **Note:** The API key will be provided separately

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

---
