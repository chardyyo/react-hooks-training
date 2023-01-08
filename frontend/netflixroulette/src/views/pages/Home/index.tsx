import React from "react";
import styles from "../../../App.module.scss";
import GenreFilter from "../../../components/Genres";
import SortMovie from "../../../components/SortMovie";
import { MovieListResponse } from "../../../types/movie";
import MovieList from "../MovieList";

interface Props {
  loading: boolean;
  error: boolean;
  movies: MovieListResponse;
}

const Home: React.FC<Props> = ({ loading, error, movies }) => {
  return (
    <React.Fragment>
      <main className={styles.container}>
        <div className={styles.controlsBar}>
          <GenreFilter />
          <SortMovie />
        </div>
        <hr className={styles.hr} />
        <MovieList loading={loading} error={error} movies={movies} />
      </main>
    </React.Fragment>
  );
};

export default Home;
