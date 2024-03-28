import "./App.css";
import LandingPage from "./views/LandingPage";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events from "./views/Events";
import About from "./views/About";
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
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/about",
    element: <About />,
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
