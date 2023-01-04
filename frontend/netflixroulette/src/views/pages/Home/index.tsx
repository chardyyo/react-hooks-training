import { Formik, Field, Form, FormikHelpers, FieldArray } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardContainer,
  CardTitle,
} from "../../../components/styles/Card/index.styled";
import { api } from "../../../features/movie/service";

interface Values {
  title: string;
  tagline: string;
  releaseDate: string;
  movieURL: string;
  rating: number;
  genres: string[];
  runtime: number;
  overview: string;
}

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

  // use mutation
  const [addMovie, { isLoading: isUpdating, isSuccess, isUninitialized }] =
    api.useCreateMovieMutation();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <React.Fragment>
      <div className="container">
        <Formik
          initialValues={{
            title: "",
            tagline: "",
            releaseDate: "",
            movieURL: "",
            rating: 0,
            genres: ["Comedy", "Drama", "Romance"],
            runtime: 0,
            overview: "",
          }}
          onSubmit={(values: Values) => {
            setTimeout(() => {
              addMovie({
                title: values?.title,
                tagline: values?.tagline,
                vote_average: values?.rating,
                vote_count: 6782,
                release_date: values?.releaseDate,
                poster_path: values?.movieURL,
                overview: values?.overview,
                budget: 30000000,
                revenue: 445435700,
                runtime: 128,
              });
            }, 500);
          }}
        >
          <Form>
            <label htmlFor="title">Movie Title</label>
            <Field id="title" name="title" placeholder="Moana" />

            <label htmlFor="tagline">Movie Tagline</label>
            <Field id="tagline" name="tagline" placeholder="Tagline" />

            <label htmlFor="releaseDate">Release Date</label>
            <Field
              id="releaseDate"
              name="releaseDate"
              placeholder="Select Date"
            />

            <label htmlFor="movieURL">Movie URL</label>
            <Field
              id="movieURL"
              name="movieURL"
              placeholder="https://"
              type="text"
            />

            <label htmlFor="rating">Rating</label>
            <Field id="rating" name="rating" placeholder="7.8" />

            <label htmlFor="genres">Genre</label>
            <Field id="genres" name="genres" placeholder="Select Genre" />

            <label htmlFor="runtime">Runtime</label>
            <Field id="runtime" name="runtime" placeholder="minutes" />

            <label htmlFor="overview">Overview</label>
            <Field
              as="textarea"
              id="overview"
              name="overview"
              placeholder="Movie description"
            />

            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>

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
