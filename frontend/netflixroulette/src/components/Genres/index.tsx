import React from "react";
import useQueryString from "../../hooks/useQueryString";
import { GenreQueries, SEARCH_PARAMS } from "../../types";
import { GENRE_FILTERS } from "../../utils/constants";
import styles from "./Genre.module.scss";
import GenreButton from "./GenreButton";

interface GenreProps {
  selected: GenreQueries;
}

const GenreFilter: React.FC<GenreProps> = ({ selected }) => {
  const setQueryString = useQueryString();
  const onHandleChange = (genre: GenreQueries) => {
    if (selected !== genre) {
      setQueryString({ [SEARCH_PARAMS.GENRE]: genre });
    }
  };

  return (
    <React.Fragment>
      <div className={styles.genreButtons}>
        {GENRE_FILTERS.map((genre) => {
          return (
            <GenreButton
              key={genre}
              onClick={onHandleChange}
              active={selected === genre}
              genre={genre}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default GenreFilter;
