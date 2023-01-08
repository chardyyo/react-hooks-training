import React, { MouseEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import useQueryString from "../../hooks/useQueryString";
import { SEARCH_PARAMS } from "../../types";
import { extractYear } from "../../utils/helpers";
import Poster from "../Poster";
import styles from "./Card.module.scss";

interface CardProps {
  id: number;
  title: string;
  tagline?: string;
  release_date: string;
  poster_path: string | null;
  onContextMenu: (event: MouseEvent<HTMLDivElement>, id: number) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  tagline,
  release_date,
  poster_path,
  onContextMenu,
}) => {
  const navigate = useNavigate();

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onContextMenu(event, id);
  };

  const handleClick = () => {
    const movieDetailsPage = `movies/${id}`;
    navigate(movieDetailsPage);
  };

  const handlePressUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === "Enter") {
      handleClick();
    }
  };

  const year = release_date ? extractYear(release_date) : "N/A";

  return title ? (
    <React.Fragment>
      <div
        className={styles.card}
        onContextMenu={handleOpenMenu}
        onClick={handleClick}
        onKeyUp={handlePressUp}
        role="button"
        tabIndex={0}
      >
        <Poster url={poster_path} className={styles.poster} />
        <div className={styles.info}>
          <div className={styles.info__left}>
            <span className={styles.info__title}>{title}</span>
            <span className={styles.info__tagline}>{tagline || title}</span>
          </div>
          <div className={styles.info__right}>
            <span className={styles.info__year}>{year}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

export default React.memo(Card);
