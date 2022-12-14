import React from "react";
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
    console.log("Movie details...");
    fetchSingleMovie(id).then((details) => {
      setMovie(details);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="container">{movie?.original_title}</div>
      <p>{movie?.overview}</p>
      <a href="/"> {"<"} Go back</a>
    </React.Fragment>
  );
};

export default MovieDetails;
