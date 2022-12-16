import { Movie } from "./../types/movie";

const defaultState = {
  movies: [] as Movie[],
};

const appReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case "movies/list":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };

    case "movies/delete":
      const filteredMovie = state.movies?.filter(
        (movie) => movie?.id !== action.payload
      );

      return {
        ...state,
        movies: filteredMovie,
      };

    default:
      return state;
  }
};

export default appReducer;
