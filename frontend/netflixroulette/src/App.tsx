import React, { Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Spinner from "./components/Spinner";
import { api } from "./features/movie/service";
import { MovieListResponse } from "./types/movie";
import Home from "./views/pages/Home";
import MovieDetails from "./views/pages/Movie";
import styles from "./App.module.scss";
import Title from "./components/Title";

function App() {
  const [fetchParams, setFetchParams] = React.useState<any>({
    limit: 15,
    criteria: "",
    searchBy: "",
    order: "desc",
    genre: "",
  });

  const {
    data: movies,
    isLoading,
    isError,
  } = api.useGetMoviesQuery({
    limit: 15,
    criteria: fetchParams?.criteria,
    order: fetchParams?.order,
    searchBy: fetchParams?.searchBy,
    genre: fetchParams?.genre,
  });

  return (
    <React.Fragment>
      <Routes>
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <Home
                loading={isLoading}
                error={isError}
                movies={movies as MovieListResponse}
              />
            </Suspense>
          }
        ></Route>
        <Route
          path="/movies/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <MovieDetails
                onClick={() => console.log("close movie details")}
              />
            </Suspense>
          }
        ></Route>
        <Route path="*" element={<span>Not found</span>}></Route>
      </Routes>
      <footer className={styles.footer}>
        <Title />
      </footer>
    </React.Fragment>
  );
}

export default App;
