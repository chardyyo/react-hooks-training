import React from "react";
import { MovieListResponse, MovieDetailsResponse } from "../types/movie";
import useCustomMethods from "./useCustomMethods";

export default () => {
  const { fetchPopularMovies, fetchSingleMovie } = useCustomMethods();

  return {
    fetchPopularMovies,
    fetchSingleMovie,
  };
};
