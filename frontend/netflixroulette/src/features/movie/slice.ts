import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieListResponse } from "../../types/movie";
import { fetchMovies } from "../../services/http";
import { RootState } from "../../store";

export interface MovieState {
  movies: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: MovieState = {
  movies: {} as MovieListResponse,
  status: "idle",
};

export const getMovies = createAsyncThunk(
  "movies/list",
  async (): Promise<MovieListResponse> => {
    try {
      const URL = "http://localhost:4000/movies";
      const response = await fetchMovies(URL);
      return response;
    } catch (error) {
      return Promise.reject("Something went wrong...");
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
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
      });
  },
});

export const moviesSelector = (state: RootState) => state.movies;

export default movieSlice;
