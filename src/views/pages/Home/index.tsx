import React from "react";
import { Link } from "react-router-dom";
import { MovieListResponse } from "../../../types/movie";
import useMovieService from "../../../hooks/useMovieService";

const Home: React.FC = () => {
  const { fetchPopularMovies } = useMovieService();

  const [movies, setMovies] = React.useState<MovieListResponse>(
    {} as MovieListResponse
  );

  React.useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchPopularMovies();
      if (movies) {
        setMovies(movies);
      }
    };

    fetchMovies();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <ul>
          {movies?.results?.map((movie) => {
            return (
              <li key={movie?.id}>
                <Link to={`movies/${movie?.id}`}>{movie?.original_title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
