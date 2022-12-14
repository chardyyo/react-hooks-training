import React from "react";
import { Link } from "react-router-dom";
import { MovieListResponse } from "../../../types/movie";
import useMovieService from "../../../hooks/useMovieService";
import {
  Card,
  CardBody,
  CardContainer,
  CardTitle,
} from "../../../components/styles/Card/index.styled";

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
              <CardContainer key={movie?.id}>
                <Card>
                  <CardTitle>
                    <Link to={`movies/${movie?.id}`}>
                      {movie?.original_title}
                    </Link>
                  </CardTitle>
                  <CardBody>
                    <p>{movie?.overview}</p>
                  </CardBody>
                </Card>
              </CardContainer>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
