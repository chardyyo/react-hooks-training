import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardContainer,
  CardTitle,
} from "../../../components/styles/Card/index.styled";
import { api } from "../../../features/movie/service";

const Home: React.FC = () => {
  const [fetchParams, setFetchParams] = React.useState<any>({
    limit: 15,
    criteria: "",
    order: "desc",
  });

  const {
    data: movies,
    error,
    isLoading,
    isFetching,
  } = api.useGetMoviesQuery({
    limit: 15,
    criteria: fetchParams?.criteria,
    order: fetchParams?.order,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  console.log("Filtered movies: ", movies);

  return (
    <React.Fragment>
      <div className="container">
        <div className="btn-group">
          <button
            onClick={() =>
              setFetchParams({
                limit: 15,
                criteria: "release_date",
                order: "desc",
              })
            }
          >
            Sort by release date
          </button>
          <button
            onClick={() =>
              setFetchParams({
                limit: 15,
                criteria: "vote_average",
                order: "desc",
              })
            }
          >
            Sort by rating
          </button>
          <button onClick={() => console.log("OK")}>Filter by genre</button>
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
