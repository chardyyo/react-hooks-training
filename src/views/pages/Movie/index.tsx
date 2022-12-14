import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useMovie from "../../../hooks/useMovieService";
import { MovieDetailsResponse } from "../../../types/movie";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const { fetchSingleMovie } = useMovie();

  const [movie, setMovie] = React.useState<MovieDetailsResponse>(
    {} as MovieDetailsResponse
  );

  React.useEffect(() => {
    const fetchMovie = async (id: string) => {
      const movie = await fetchSingleMovie(id);
      if (movie) {
        setMovie(movie);
      }
    };

    fetchMovie(id as string);
  }, []);

  return (
    <React.Fragment>
      <div className="container">{movie?.original_title}</div>
      <p>{movie?.overview}</p>
      <Link to="/"> {"<"} Go back</Link>
    </React.Fragment>
  );
};

export default MovieDetails;
