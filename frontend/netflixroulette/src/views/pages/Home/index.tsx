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
  const { sortByReleaseDate } = movieSlice.actions;

  React.useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const handleSortByReleaseDate = () => {
    console.log("Sort by release date: ");
    // const sortedMovie = movies?.data?.sort((a, b) => {
    //   if (a?.release_date > b?.release_date) {
    //     return 1;
    //   }

    //   if (a?.release_date < b?.release_date) {
    //     return -1;
    //   }

    //   return 0;
    // });

    // console.log(sortedMovie);
  };

  const handleSortByRating = () => {
    console.log("Sort by rating");
  };

  console.log("New movies sorted: ", movies);

  return (
    <React.Fragment>
      <div className="container">
        <div className="btn-group">
          <button onClick={() => dispatch(sortByReleaseDate(movies))}>
            Sort by release date
          </button>
          <button onClick={handleSortByRating}>Sort by rating</button>
        </div>
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
      </div>
    </React.Fragment>
  );
};

export default Home;
