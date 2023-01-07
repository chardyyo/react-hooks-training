import React, { Suspense } from "react";
import styles from "./App.module.scss";
import GenreFilter from "./components/Genres";
import Header from "./components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main className={styles.container}>
        <div className={styles.controlBar}>
          <GenreFilter />
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
