import React from "react";
import { GenreQueries } from "../../types";
import { GENRE_FILTERS } from "../../utils/constants";
import styles from "./Genre.module.scss";
import GenreButton from "./GenreButton";

interface GenreProps {
  selected?: GenreQueries;
}

const GenreFilter: React.FC<GenreProps> = ({ selected }) => {
  return (
    <React.Fragment>
      <div className={styles.genreButtons}>
        {GENRE_FILTERS.map((genre, idx: number) => {
          return (
            <GenreButton
              key={idx}
              onClick={() => {
                console.log("Handle genre click");
              }}
              active={true}
              genre={genre}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default GenreFilter;
