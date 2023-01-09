import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  fullscreen?: boolean;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ fullscreen, className }) => {
  let classes = fullscreen
    ? styles.loaderWrapper_fullscreen
    : styles.loaderWrapper;

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <div className={classes}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
