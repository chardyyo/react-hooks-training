import React, { Suspense } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import Spinner from "./components/Spinner";
import { api } from "./features/movie/service";
import { MovieListResponse } from "./types/movie";
import MovieDetails from "./views/pages/Movie";
import styles from "./App.module.scss";
import Title from "./components/Title";
import {
  GenreQueries,
  PATHS,
  RequestParams,
  SEARCH_PARAMS,
  SortQueries,
} from "./types";
import Header from "./components/Header";
import GenreFilter from "./components/Genres";
import SortMovie from "./components/SortMovie";
import ErrorBoundary from "./components/ErrorBoundary";
import MovieForm from "./components/Form";
import { ADD_FORM, EDIT_FORM } from "./utils/constants";
import { hasGenre, hasSortBy } from "./utils/helpers";

type LocationState = null | {
  backgroundLocation: Location;
};

const MovieList = React.lazy(() => import("./views/pages/MovieList"));
const DeleteForm = React.lazy(() => import("./components/Form/Delete"));
const EditorForm = React.lazy(() => import("./components/Form"));

function App() {
  const location = useLocation();
  const state = location.state as LocationState;
  const backgroundLocation = state?.backgroundLocation;

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SEARCH_PARAMS.QUERY) as string;
  const genre = searchParams.get(SEARCH_PARAMS.GENRE) as GenreQueries;
  const sortBy = searchParams.get(SEARCH_PARAMS.SORT_BY) as SortQueries;
  const activeMovieId = searchParams.get(SEARCH_PARAMS.MOVIE);

  React.useEffect(() => {
    const requestParams: Partial<RequestParams> = {};

    if (query) {
      requestParams.query = query;
    }

    if (hasGenre(genre)) {
      requestParams.genre = genre;
    }

    if (hasSortBy(sortBy)) {
      requestParams.sortBy = sortBy;
    }
  }, [query, genre, sortBy]);

  const {
    data: movies,
    isError,
    isLoading,
  } = api.useGetMoviesQuery({
    limit: 15,
  });

  const handleCloseMovieDetails = React.useCallback(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(SEARCH_PARAMS.MOVIE);
    setSearchParams(newParams);
  }, [setSearchParams, searchParams]);

  const activeMovie =
    activeMovieId &&
    movies?.data.find(({ id }) => id === Number(activeMovieId));

  const addMovie = () => {
    console.log("Handle adding new movies");
  };

  const editMovie = () => {
    console.log("handle edit movie");
  };

  const removeMovie = () => {
    console.log("handle delete movie");
  };

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route
          path={PATHS.ROOT}
          element={<Navigate to={PATHS.SEARCH} replace />}
        />
        <Route
          path={PATHS.SEARCH}
          element={
            <ErrorBoundary>
              {activeMovie ? (
                <MovieDetails
                  onClick={handleCloseMovieDetails}
                  movie={activeMovie}
                />
              ) : (
                <Header />
              )}
              <Suspense fallback={<Spinner />}>
                <main className={styles.container}>
                  <div className={styles.controlsBar}>
                    <GenreFilter selected={genre ? genre : "all"} />
                    <SortMovie selected={sortBy ? sortBy : "POPULARITY"} />
                  </div>
                  <hr className={styles.hr} />
                  <MovieList
                    loading={isLoading}
                    error={isError}
                    movies={movies as MovieListResponse}
                  />
                </main>
                <footer className={styles.footer}>
                  <Title />
                </footer>
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route path={PATHS.REST} element={<>Not Found</>} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path={PATHS.MOVIE}>
            <Route
              path={PATHS.MOVIE_ADD}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Spinner fullscreen />}>
                    <MovieForm
                      onSubmit={addMovie}
                      variant={ADD_FORM}
                      movies={movies as MovieListResponse}
                    />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path={PATHS.MOVIE_EDIT}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Spinner fullscreen />}>
                    <EditorForm
                      onSubmit={editMovie}
                      variant={EDIT_FORM}
                      movies={movies as MovieListResponse}
                    />
                  </Suspense>
                </ErrorBoundary>
              }
            />
            <Route
              path={PATHS.MOVIE_DELETE}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Spinner fullscreen />}>
                    <DeleteForm onSubmit={removeMovie} />
                  </Suspense>
                </ErrorBoundary>
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
