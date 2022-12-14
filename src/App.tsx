import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/styles/Footer/index.styled";
import { GlobalStyles } from "./components/styles/Global";
import { Header } from "./components/styles/Header/index.styled";

const HomePage = React.lazy(() => import("./views/pages/Home"));
const MovieDetailsPage = React.lazy(() => import("./views/pages/Movie"));

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Header>netflixroulette</Header>
      <Routes>
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<span>Loading...</span>}>
              <HomePage />
            </Suspense>
          }
        ></Route>
        <Route
          path="/movies/:id"
          element={
            <Suspense fallback={<span>Loading...</span>}>
              <MovieDetailsPage />
            </Suspense>
          }
        ></Route>

        <Route path="*" element={<span>Page not found</span>}></Route>
      </Routes>
      <Footer>
        <p>rbo13</p>
      </Footer>
    </React.Fragment>
  );
}

export default App;
