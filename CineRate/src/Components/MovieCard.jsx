import React from "react";

export default function MovieCard({ movie, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 group"
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover group-hover:opacity-90"
        />
      ) : (
        <div className="bg-gray-700 h-72 flex items-center justify-center">
          No Image
        </div>
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-100 transition flex flex-col justify-end p-4">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-sm text-gray-400">{movie.release_date}</p>
        <p className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</p>
      </div>
    </div>
  );
}
