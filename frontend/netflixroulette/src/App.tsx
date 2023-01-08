import React, { Suspense } from "react";
import styles from "./App.module.scss";
import GenreFilter from "./components/Genres";
import Header from "./components/Header";
import SortMovie from "./components/SortMovie";
import { api } from "./features/movie/service";
import { MovieListResponse } from "./types/movie";
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
      <main className={styles.container}>
        <div className={styles.controlsBar}>
          <GenreFilter />
          <SortMovie />
        </div>
        <hr className={styles.hr} />
        {/* Movie listings */}
        <MovieList
          loading={isLoading}
          error={isError}
          movies={movies as MovieListResponse}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
