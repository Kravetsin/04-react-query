//! 🔹 Imports
import axios from "axios";
import type { Movie } from "../types/movie";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

//! 🔹 SecretKey
const myKey = import.meta.env.VITE_API_KEY;

//! 🔹 Interface
type MovieHttpProps = {
  results: Movie[];
  total_pages: number;
};

//! 🔹 Default Axios URL
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

//! 🔹 Response
const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieHttpProps> => {
  const options = {
    params: { query, include_adult: false, page },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };

  try {
    const response = await axios.get<MovieHttpProps>("search/movie", options);

    return response.data;
  } catch (error) {
    console.error("Error fetching movies");
    throw error;
  }
};

//! 🔹 Query Hook
export const useMovies = (query: string, currentPage: number) => {
  return useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });
};
