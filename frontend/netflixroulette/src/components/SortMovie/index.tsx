import React from "react";
import useQueryString from "../../hooks/useQueryString";
import useToggle from "../../hooks/useToggle";
import { SEARCH_PARAMS, SortQueries } from "../../types";
import { SORT_BY_FILTERS } from "../../utils/constants";
import styles from "./SortMovie.module.scss";

interface SortProps {
  selected: SortQueries;
}

const SortMovie: React.FC<SortProps> = ({ selected }) => {
  const { toggleRef, showElement, onToggle } = useToggle();
  const setQueryString = useQueryString();

  const handleSelect = (sortBy: SortQueries) => () => {
    onToggle();

    if (selected !== sortBy) {
      setQueryString({
        [SEARCH_PARAMS.SORT_BY]: sortBy,
      });
    }
  };

  return (
    <React.Fragment>
      <div className={styles.sorting}>
        <span className={styles.sorting__label}>Sort By</span>
        <div ref={toggleRef} className={styles.dropDown}>
          <input
            className={
              showElement
                ? styles.dropDown__select_show
                : styles.dropDown__select
            }
            type="button"
            value={selected}
            name="sortby-select"
            onClick={onToggle}
          />
          {showElement && (
            <ul className={styles.dropDown__list}>
              {SORT_BY_FILTERS.map((option) => {
                return (
                  <li key={option}>
                    <button
                      type="button"
                      className={styles.dropDown__option}
                      onClick={handleSelect(option)}
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(SortMovie);
