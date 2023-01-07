import React from "react";
import styles from "./Header.module.scss";
interface HeaderProps {
  query?: string;
}

const Header: React.FC<HeaderProps> = ({ query }) => {
  return (
    <React.Fragment>
      <header className={styles.header}></header>
    </React.Fragment>
  );
};

export default Header;
