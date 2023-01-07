import React from "react";
import { GenreQueries } from "../../../types";
import styles from "./GenreButton.module.scss";

interface GenreButtonProps {
  active: boolean;
  genre: GenreQueries;
  onClick: (genre: GenreQueries) => void;
}

const GenreButton: React.FC<GenreButtonProps> = ({
  active,
  genre,
  onClick,
}) => {
  const handleClick = () => {
    onClick(genre);
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className={active ? styles.genreBtn_active : styles.genreBtn}
        onClick={handleClick}
      >
        {genre.toUpperCase()}
      </button>
    </React.Fragment>
  );
};

export default GenreButton;
