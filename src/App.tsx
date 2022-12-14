import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = React.lazy(() => import("./views/pages/Home"));
const MovieDetailsPage = React.lazy(() => import("./views/pages/Movie"));

function App() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default App;
