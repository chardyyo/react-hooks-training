/**
 * services/http/index.ts
 * contains all the necessary functions for
 * HTTP related calls. i.e calling API.
 *
 */

import { Movie, MovieListResponse, Movies } from "../../types/movie";

const fetchMovies = async (URL: string): Promise<MovieListResponse> => {
  try {
    const response = await fetch(URL, {
      method: "GET",
    });
    const data: MovieListResponse = await response.json();
    if (data) {
      return Promise.resolve(data);
    }

    return Promise.reject(new Error("something went wrong with backend."));
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchMovie = async (URL: string): Promise<Movie> => {
  try {
    const response = await fetch(URL, {
      method: "GET",
    });
    const data: Movie = await response.json();
    if (data) {
      return Promise.resolve(data);
    }

    return Promise.reject(new Error("something went wrong with backend."));
  } catch (error) {
    return Promise.reject(error);
  }
};

export { fetchMovies, fetchMovie };
