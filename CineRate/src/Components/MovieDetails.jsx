import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reviews from "./Reviews";

const API_KEY = "12733eaf3a0fd72b7ccac100ee17208c";

export default function MovieDetails({ movie, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setDetails(data);
    };
    fetchDetails();
  }, [movie]);

  if (!details) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-start p-8 overflow-y-auto z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-4xl w-full shadow-2xl"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-black font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 hover:text-white transition"
          >
            X
          </button>

          {/* Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {details.poster_path && (
              <motion.img
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                className="rounded-xl shadow-lg w-full md:w-1/3 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}

            <div className="flex-1">
              <h2 className="text-3xl font-extrabold">{details.title}</h2>
              <p className="text-gray-300 mt-1">{details.release_date}</p>
              <p className="mt-4 text-lg leading-relaxed">{details.overview}</p>
              <p className="mt-4 text-yellow-400 font-semibold text-xl">
                ⭐ {details.vote_average.toFixed(1)} / 10
              </p>

              {/* Extra info */}
              <div className="mt-4 text-sm text-gray-300">
                <p>
                  🎭 Genres:{" "}
                  {details.genres?.map((g) => g.name).join(", ") || "N/A"}
                </p>
                <p>⏱ Runtime: {details.runtime} min</p>
                <p>🌍 Language: {details.original_language?.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <Reviews movieId={movie.id} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
