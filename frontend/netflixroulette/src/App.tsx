import React, { Suspense } from "react";
import styles from "./App.module.scss";
import GenreFilter from "./components/Genres";
import Header from "./components/Header";
import SortMovie from "./components/SortMovie";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className={styles.container}>
        <div className={styles.controlsBar}>
          <GenreFilter />
          <SortMovie />
        </div>
        <hr className={styles.hr} />
      </main>
    </React.Fragment>
  );
}

export default App;
