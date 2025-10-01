import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const API_KEY = "12733eaf3a0fd72b7ccac100ee17208c";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOption, setSortOption] = useState("popularity");

  // Fetch Trending Movies
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      const data = await res.json();
      setTrending(data.results || []);
    };
    fetchTrending();
  }, []);

  // Search Movies
  const searchMovies = async (query) => {
    if (!query) return;
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results || []);
  };

  // Apply sorting
  const sortMovies = (list) => {
    if (!list) return [];
    switch (sortOption) {
      case "rating":
        return [...list].sort((a, b) => b.vote_average - a.vote_average);
      case "release":
        return [...list].sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      default: // popularity
        return [...list].sort((a, b) => b.popularity - a.popularity);
    }
  };

  const displayMovies = movies.length > 0 ? movies : trending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white p-6">
      <div className="flex justify-center item-center ">      
        <h1 className="text-4xl font-extrabold text-center mb-6 tracking-wide">
          🎬 CineRate - Movie Reviews & Ratings
        </h1>
      </div>

      {/* Search */}
      <SearchBar onSearch={searchMovies} />

      {/* Sorting Options */}
      <div className="flex justify-end mt-6">
        <select
          className="bg-gray-800 px-4 py-2 rounded-lg text-white"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="popularity">🔥 Popularity</option>
          <option value="release">📅 Release Date</option>
          <option value="rating">⭐ Rating</option>
        </select>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        {movies.length > 0 ? "🔍 Search Results" : "🔥 Trending This Week"}
      </h2>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sortMovies(displayMovies).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {/* Modal for Details */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
