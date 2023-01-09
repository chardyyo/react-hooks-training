import React from "react";
import { generatePath, Link, useLocation } from "react-router-dom";
import useHiding from "../../../hooks/useHiding";
import { PATHS } from "../../../types";
import { BOTTOM_OFFSET, RIGHT_OFFSET } from "../../../utils/constants";
import CloseButton from "../../Cross";
import styles from "./ContextMenu.module.scss";

interface ContextMenuProps {
  coordinateX: number;
  coordinateY: number;
  id: number;
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  coordinateX,
  coordinateY,
  id,
  onClose,
}) => {
  const focusedElementRef = useHiding(onClose);
  const location = useLocation();

  const locationState = { backgroundLocation: location };

  const x = Math.min(window.innerWidth - RIGHT_OFFSET, coordinateX);
  const y = Math.min(
    window.pageYOffset + window.innerHeight - BOTTOM_OFFSET,
    coordinateY
  );

  const editPath = generatePath(PATHS.MOVIE_EDIT, { id: String(id) });
  const deletePath = generatePath(PATHS.MOVIE_DELETE, { id: String(id) });
  return (
    <React.Fragment>
      <div
        ref={focusedElementRef}
        className={styles.menu}
        style={{ left: x, top: y }}
      >
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <CloseButton side="12" />
        </button>
        <Link to={editPath} state={locationState}>
          <button type="button" className={styles.edit} onClick={onClose}>
            Edit
          </button>
        </Link>
        <Link to={deletePath} state={locationState}>
          <button type="button" className={styles.delete} onClick={onClose}>
            Delete
          </button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ContextMenu);
