import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardContainer,
  CardTitle,
} from "../../../components/styles/Card/index.styled";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import movieSlice, {
  getMovies,
  moviesSelector,
} from "../../../features/movie/slice";

const Home: React.FC = () => {
  const { movies } = useAppSelector(moviesSelector);
  const dispatch = useAppDispatch();
  const { sortByReleaseDate, sortByRating } = movieSlice.actions;

  React.useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="btn-group">
          <button onClick={() => dispatch(sortByReleaseDate(movies))}>
            Sort by release date
          </button>
          <button onClick={() => dispatch(sortByRating(movies))}>
            Sort by rating
          </button>
        </div>
        {movies?.data?.map((m, idx) => {
          return (
            <CardContainer key={idx}>
              <Card>
                <CardTitle>
                  <Link to={`movies/${m?.id}`}>{m?.title}</Link>
                </CardTitle>
                <CardBody>
                  <div>
                    Release: <strong>{m?.release_date}</strong>
                  </div>
                  <p
                    style={{
                      marginTop: "1em",
                      marginBottom: "1em",
                    }}
                  >
                    {m?.overview}
                  </p>
                  <span>
                    <strong>Rating: </strong>
                    {m?.vote_average}
                  </span>
                </CardBody>
              </Card>
            </CardContainer>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Home;
