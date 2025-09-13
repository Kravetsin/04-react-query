//! 🔹 Imports
import axios from "axios";
import type { Movie } from "../types/movie";

//! 🔹 SecretKey
const myKey = import.meta.env.VITE_API_KEY;

//! 🔹 Interface
interface MovieHttpProps {
  results: Movie[];
}

//! 🔹 Default Axios URL
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

//! 🔹 fetchMovies
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const options = {
    params: { query: `${query}`, include_adult: false },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };

  try {
    const response = await axios.get<MovieHttpProps>("search/movie", options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies");
    throw error;
  }
};
