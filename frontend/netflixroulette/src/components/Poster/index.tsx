import React from "react";
import { IMG_PLACEHOLDER } from "../../utils/constants";
import styles from "./Poster.module.scss";

interface PosterProps {
  url: string | null;
  className?: string;
}

const Poster: React.FC<PosterProps> = ({ url, className }) => {
  const [hasImageError, setHasImageError] = React.useState<boolean>(false);

  React.useEffect(() => {
    setHasImageError(false);
  }, []);

  const handleLoadError = () => {
    setHasImageError(true);
  };

  return (
    <React.Fragment>
      <picture className={className}>
        {hasImageError ? (
          <img
            src={IMG_PLACEHOLDER}
            className={styles.img}
            alt="Movie poster"
          />
        ) : (
          <img
            src={url || IMG_PLACEHOLDER}
            className={styles.img}
            alt="Movie poster"
            onError={handleLoadError}
          />
        )}
      </picture>
    </React.Fragment>
  );
};

export default React.memo(Poster);
