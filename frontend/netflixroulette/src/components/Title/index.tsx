import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Title.module.scss";

const Title: React.FC = () => {
  const navigate = useNavigate();

  return (
    <span
      className={styles.title}
      onClick={() => {
        navigate("/");
      }}
    >
      <b>netflix</b>
      roulette
    </span>
  );
};

export default Title;
