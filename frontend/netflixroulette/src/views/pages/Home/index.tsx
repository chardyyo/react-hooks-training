import React from "react";
import { Link } from "react-router-dom";
import useMovieService from "../../../hooks/useMovieService";
import {
  Card,
  CardBody,
  CardContainer,
  CardTitle,
} from "../../../components/styles/Card/index.styled";
import { MovieListResponse } from "../../../types/movie";

const Home: React.FC = () => {
  const { fetchAllMovies } = useMovieService();

  const [movies, setMovies] = React.useState<MovieListResponse>(
    {} as MovieListResponse
  );

  React.useEffect(() => {
    const fetchMovies = async () => {
      const movieList = await fetchAllMovies();
      if (movieList) {
        setMovies(movieList);
      }
    };

    fetchMovies();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <ul>
          {movies?.data?.map((m, idx) => {
            return (
              <CardContainer key={idx}>
                <Card>
                  <CardTitle>
                    <Link to={`movies/${m?.id}`}>{m?.title}</Link>
                  </CardTitle>
                  <CardBody>
                    <p>{m?.overview}</p>
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
