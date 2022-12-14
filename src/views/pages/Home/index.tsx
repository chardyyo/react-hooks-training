import React from "react";
import useFetchMovie from "../../../hooks/useFetchMovie";
import { MovieListResponse } from "../../../types/movie";

const Home: React.FC = () => {
  const { fetchPopularMovies } = useFetchMovie();

  const [movies, setMovies] = React.useState<MovieListResponse>(
    {} as MovieListResponse
  );

  React.useEffect(() => {
    fetchPopularMovies().then((list) => {
      setMovies(list);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <ul>
          {movies?.results?.map((movie) => {
            return (
              <li key={movie?.id}>
                <a href={`movies/${movie?.id}`}>{movie?.original_title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
