import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useMovieService from "../../../hooks/useMovieService";
import { Movie } from "../../../types/movie";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const { fetchMovie } = useMovieService();

  const [movie, setMovie] = React.useState<Movie>({} as Movie);

  React.useEffect(() => {
    const fetchSingleMovie = async (id: string) => {
      const m = await fetchMovie(id);
      if (m) {
        setMovie(m);
      }
    };

    fetchSingleMovie(id as string);
  }, []);

  return (
    <React.Fragment>
      <div className="container">{movie?.title}</div>
      <p>{movie?.overview}</p>
      <Link to="/"> {"<"} Go back</Link>
    </React.Fragment>
  );
};

export default MovieDetails;
