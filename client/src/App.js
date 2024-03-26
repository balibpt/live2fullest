import "./App.css";
import LandingPage from "./views/LandingPage";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./views/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
