import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Data, Movie, MovieListResponse } from "../../types/movie";
import { fetchMovie, fetchMovies } from "../../services/http";
import { RootState } from "../../store";
import { sortByKey } from "./helper";

const URL = "http://localhost:4000/movies";

export interface MovieState {
  movies: MovieListResponse;
  movie: Movie;
  status: "idle" | "loading" | "failed";
}

const initialState: MovieState = {
  movies: {} as MovieListResponse,
  movie: {} as Movie,
  status: "idle",
};

export const getMovies = createAsyncThunk(
  "movies/list",
  async (): Promise<MovieListResponse> => {
    try {
      const response = await fetchMovies(URL);
      return response;
    } catch (error) {
      return Promise.reject("Something went wrong...");
    }
  }
);

export const getMovie = createAsyncThunk(
  "movies/retrieve",
  async (id: string): Promise<Movie> => {
    try {
      const movieInfoURL = `${URL}/${id}`;
      const response = await fetchMovie(movieInfoURL);
      return response;
    } catch (error) {
      return Promise.reject("Something went wrong...");
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    sortMoviesBy: (state, action) => {
      const sortedMovies: Data[] = state.movies?.data
        ?.slice()
        .sort(sortByKey(action.payload));

      state.movies = {
        ...state.movies,
        data: sortedMovies,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = "idle";
        state.movie = action.payload;
      })
      .addCase(getMovie.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const moviesSelector = (state: RootState) => state.movies;

export default movieSlice;
