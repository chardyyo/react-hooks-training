import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { api } from "../../../features/movie/service";
import { getMovie, moviesSelector } from "../../../features/movie/slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface MovieDetailsProps {
  onClick: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ onClick }) => {
  const { id } = useParams();
  const {
    data: movie,
    isLoading,
    isError,
  } = api.useGetMovieByIdQuery(id as string);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <>Something went wrong</>;
  }

  return (
    <React.Fragment>
      <div className="container">{movie?.title}</div>
      <p>{movie?.overview}</p>
      <Link to="/"> {"<"} Go back</Link>
    </React.Fragment>
  );
};

export default MovieDetails;
