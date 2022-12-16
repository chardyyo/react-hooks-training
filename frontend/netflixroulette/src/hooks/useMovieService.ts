import React from "react";
import { fetchMovie, fetchMovies } from "../services/http";

const BASE_URL = "http://localhost:4000";

export default () => {
  return {
    fetchAllMovies: React.useCallback(async () => {
      const MOVIES_URL = `${BASE_URL}/movies`;
      return await fetchMovies(MOVIES_URL);
    }, []),
    fetchMovie: React.useCallback(async (id: string) => {
      const MOVIES_URL = `${BASE_URL}/movies/${id}`;
      return await fetchMovie(MOVIES_URL);
    }, []),
  };
};
