import { MovieDetailsResponse, MovieListResponse } from "./../types/movie";
import React from "react";
import { fetchMovies, fetchMovieDetails } from "../services/http";

const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

type CustomMethodProps = {};

export default () => {
  const fetchPopularMovies = React.useCallback(async () => {
    const POPULAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
    return await fetchMovies(POPULAR_MOVIES_URL);
  }, []);

  const fetchSingleMovie = React.useCallback(async (id?: string) => {
    return await fetchMovieDetails(id as string);
  }, []);

  return {
    fetchPopularMovies,
    fetchSingleMovie,
  };
};
