import React from "react";
import Poster from "../../../components/Poster";
import Title from "../../../components/Title";
import {
  capitalize,
  extractYear,
  minutesToHours,
} from "../../../utils/helpers";
import styles from "./Movie.module.scss";
import { Movie } from "../../../types/movie";

interface MovieDetailsProps {
  onClick: () => void;
  movie: Movie;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ onClick, movie }) => {
  const genreLine = movie?.genres.map(capitalize).join(" & ");
  const year = extractYear(movie?.release_date as string);
  const duration = minutesToHours(movie?.runtime as number);

  return (
    <React.Fragment>
      <div className={styles.view}>
        <div className={styles.header}>
          <Title />
          <button
            type="button"
            className={styles.header__search}
            onClick={onClick}
          >
            <svg
              width="29"
              height="30"
              viewBox="0 0 29 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18.5"
                cy="10.5"
                r="9.5"
                stroke="#F65261"
                strokeWidth="2"
              />
              <path
                d="M10.5 19.5L1.5 28.5"
                stroke="#F65261"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>
        <div className={styles.content}>
          <Poster
            url={movie?.poster_path as string}
            className={styles.poster}
          />
          <div>
            <div className={styles.info__head}>
              <div className={styles.info__title}>
                {movie?.title}
                <span className={styles.info__rating}>
                  {movie?.vote_average}
                </span>
              </div>
              <div className={styles.info__genres}>{genreLine}</div>
            </div>
            <div className={styles.info__digits}>
              <span>{year}</span>
              <span>{duration}</span>
            </div>
            <p className={styles.info__overview}>{movie?.overview}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MovieDetails;
