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
      query: ({ limit, criteria, order }) => {
        // the URL key is the path params that gets appended to the `baseUrl`.
        // http://localhost:4000/movies
        if (criteria) {
          return {
            url: `movies?limit=${limit}&sortBy=${criteria}&sortOrder=${order}`,
          };
        }

        return {
          url: `movies?limit=${limit}`,
        };
      },
      providesTags: ["Movies"],
      // pick out data and prevent nested properties in a hook or selector.
      transformResponse: (response: MovieListResponse) => {
        return response;
      },
    }),
    // build.mutation are used for creating, updating, and deleting data.
    // sortMovies: build.mutation<MovieListResponse, any>({
    //   query: ({ criteria, order }) => ({
    //     url: `movies?sortBy=${criteria}&sortOrder=${order}`,
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //     },
    //     validateStatus: (response, result) => {
    //       // 304 Not Modified
    //       return true;
    //     },
    //   }),
    // }),
  }),
});
