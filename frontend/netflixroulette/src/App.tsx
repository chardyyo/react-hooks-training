import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import GenreFilter from "./components/Genres";
import Header from "./components/Header";
import SortMovie from "./components/SortMovie";
import Spinner from "./components/Spinner";
import { api } from "./features/movie/service";
import { MovieListResponse } from "./types/movie";
import Home from "./views/pages/Home";
import MovieList from "./views/pages/MovieList";

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
      <Header />
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
      </Routes>
    </React.Fragment>
  );
}

export default App;
