import React from "react";
import Title from "../Title";
import styles from "./Header.module.scss";
interface HeaderProps {
  query?: string;
}

const Header: React.FC<HeaderProps> = ({ query }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <header className={styles.header}>
        <div className={styles.topWrapper}>
          <Title />
          <button
            type="button"
            className={styles.addMovieBtn}
            onClick={() => {
              console.log("Handle click....");
            }}
          >
            + ADD MOVIE
          </button>
        </div>
        <form
          className={styles.searchForm}
          onSubmit={() => {
            console.log("please search...");
          }}
        >
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
