import React, { SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQueryString from "../../hooks/useQueryString";
import { PATHS, SEARCH_PARAMS } from "../../types";
import Title from "../Title";
import styles from "./Header.module.scss";
interface HeaderProps {
  query?: string;
}

const Header: React.FC<HeaderProps> = ({ query }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const setQueryString = useQueryString();

  const onAddMovie = () => {
    navigate(PATHS.MOVIE_ADD, { state: { backgroundLocation: location } });
  };

  const onFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { current } = inputRef;

    if (!current) {
      return;
    }

    const newQuery = current.value;

    if (newQuery !== query) {
      setQueryString({ [SEARCH_PARAMS.QUERY]: newQuery });
    }
  };

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.topWrapper}>
          <Title />
          <button
            type="button"
            className={styles.addMovieBtn}
            onClick={onAddMovie}
          >
            + ADD MOVIE
          </button>
        </div>
        <form className={styles.searchForm} onSubmit={onFormSubmit}>
          <fieldset className={styles.searchForm__fieldset}>
            <legend className={styles.searchForm__label}>
              FIND YOUR MOVIE
            </legend>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="What do you want to watch?"
              ref={inputRef}
              defaultValue={query}
            />
            <button type="submit" className={styles.searchBtn}>
              SEARCH
            </button>
          </fieldset>
        </form>
      </header>
    </React.Fragment>
  );
};

export default Header;
