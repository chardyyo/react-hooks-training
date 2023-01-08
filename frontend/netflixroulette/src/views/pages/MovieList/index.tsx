import React, { MouseEvent } from "react";
import Card from "../../../components/Card";
import { MovieListResponse } from "../../../types/movie";
import styles from "./MovieList.module.scss";

interface MovieListProps {
  loading: boolean;
  error: boolean;
  movies: MovieListResponse;
}

const MovieList: React.FC<MovieListProps> = ({ loading, error, movies }) => {
  const [contextMenu, setContextMenu] = React.useState({
    showMenu: false,
    coordinateX: 0,
    coordinateY: 0,
    id: 0,
  });

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>, id: number) => {
    event.preventDefault();
    setContextMenu({
      showMenu: true,
      coordinateX: event.pageX,
      coordinateY: event.pageY,
      id,
    });
  };

  const handleCloseMenu = () => {
    setContextMenu({
      showMenu: false,
      coordinateX: 0,
      coordinateY: 0,
      id: 0,
    });
  };

  const { showMenu, coordinateX, coordinateY, id } = contextMenu;

  if (loading) {
    return <>Loading</>;
  }

  console.log("Has error: ", error);

  if (error) {
    return <span className={styles.error}>Something went wrong. {error}</span>;
  }

  return (
    <React.Fragment>
      <div className={styles.resultCount}>
        <b className={styles.resultCount__digit}>
          {String(movies?.data?.length)}
        </b>
        {` movie${movies?.data?.length === 1 ? "" : "s"} found`}
      </div>
      <div className={styles.movieList}>
        {movies?.data?.map(
          ({ id: movieId, title, tagline, release_date, poster_path }) => {
            return (
              <Card
                key={movieId}
                id={movieId}
                title={title}
                tagline={tagline}
                release_date={release_date}
                poster_path={poster_path}
                onContextMenu={handleOpenMenu}
              />
            );
          }
        )}
        {showMenu ? <>Show context menu</> : null}
      </div>
    </React.Fragment>
  );
};

export default React.memo(MovieList);
