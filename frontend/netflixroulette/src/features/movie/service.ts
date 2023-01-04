import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieListResponse } from "../../types/movie";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
  }),
  tagTypes: ["Movies"],
  endpoints: (build) => ({
    // MovieListResponse represents the return type of this query,
    // `any` represents the argument that gets passed if we call this query.
    getMovies: build.query<MovieListResponse, any>({
      query: ({ limit, criteria, order, searchBy, genre }) => {
        // the URL key is the path params that gets appended to the `baseUrl`.
        // http://localhost:4000/movies
        let requestURL = "movies?limit=15";

        if (criteria) {
          requestURL = `${requestURL}&sortBy=${criteria}`;
        }

        if (order) {
          requestURL = `${requestURL}&sortBy=release_date&sortOrder=${order}`;
        }

        if (searchBy) {
          requestURL = `${requestURL}&searchBy=${searchBy}`;
        }

        if (genre) {
          requestURL = `${requestURL}&filter=${genre}`;
        }

        return {
          url: requestURL,
        };
      },
      providesTags: ["Movies"],
      // pick out data and prevent nested properties in a hook or selector.
      transformResponse: (response: MovieListResponse) => {
        return response;
      },
    }),
    // build.mutation are used for creating, updating, and deleting data.
    createMovie: build.mutation<MovieListResponse, any>({
      query: (data) => ({
        url: "movies",
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
        validateStatus: (response, result) => {
          // 304 Not Modified
          return true;
        },
      }),
      invalidatesTags: [{ type: "Movies" }],
    }),
  }),
});
