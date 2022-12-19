import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getMovie, moviesSelector } from "../../../features/movie/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Movie } from "../../../types/movie";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const { movie } = useAppSelector(moviesSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getMovie(id as string));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="container">{movie?.title}</div>
      <p>{movie?.overview}</p>
      <Link to="/"> {"<"} Go back</Link>
    </React.Fragment>
  );
};

export default MovieDetails;
