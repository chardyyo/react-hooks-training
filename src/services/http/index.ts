/**
 * services/http/index.ts
 * contains all the necessary functions for
 * HTTP related calls. i.e calling API.
 *
 */

import { MovieDetailsResponse, MovieListResponse } from "../../types/movie";

const API_KEY = import.meta.env.VITE_MOVIE_DB_API_KEY;

/**
 * Fetch a movie from a given URL.
 * @param URL
 */
const fetchMovies = async (URL: string): Promise<MovieListResponse> => {
  try {
    const response = await fetch(URL, {
      method: "GET",
    });
    const data: MovieListResponse = await response.json();
    if (data) {
      return Promise.resolve(data);
    }

    return Promise.reject(new Error("something went wrong with the API"));
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetailsResponse> => {
  try {
    const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(MOVIE_DETAILS_URL, {
      method: "GET",
    });
    const data: MovieDetailsResponse = await response.json();
    if (data) {
      return Promise.resolve(data);
    }

    return Promise.reject(new Error("something went wrong with the API"));
  } catch (error) {
    return Promise.reject(error);
  }
};

export { fetchMovies, fetchMovieDetails };
