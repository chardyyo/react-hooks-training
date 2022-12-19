import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardContainer,
  CardTitle,
} from "../../../components/styles/Card/index.styled";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getMovies, moviesSelector } from "../../../features/movie/slice";

const Home: React.FC = () => {
  const { movies } = useAppSelector(moviesSelector);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

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
