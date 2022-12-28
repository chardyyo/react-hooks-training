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
    searchBy: "",
    order: "desc",
    genre: "",
  });

  const [selectedFilter, setSelectedFilter] = React.useState<string>("");

  const {
    data: movies,
    error,
    isLoading,
    isFetching,
  } = api.useGetMoviesQuery({
    limit: 15,
    criteria: fetchParams?.criteria,
    order: fetchParams?.order,
    searchBy: fetchParams?.searchBy,
    genre: fetchParams?.genre,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

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
          {/* <button
            onClick={() =>
              setFetchParams({
                limit: 15,
                searchBy: "genres",
                genre: "horror",
              })
            }
          >
            Filter by genre
          </button> */}
          <select
            title="movieFilter"
            onChange={(event) => {
              event?.preventDefault();
              const selectedGenre = event?.target?.value;
              setSelectedFilter(selectedGenre);

              setFetchParams({
                limit: 15,
                searchBy: "genres",
                genre: selectedGenre,
              });
            }}
          >
            {[
              "Horror",
              "Thriller",
              "Science Fiction",
              "Romance",
              "Comedy",
              "Drama",
            ].map((genre, id) => {
              return <option key={id}>{genre}</option>;
            })}
          </select>
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
