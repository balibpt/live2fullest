import "./App.css";
import LandingPage from "./views/LandingPage";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events from "./views/Events";
import About from "./views/About";
import Home from "./views/Home";
import Members from "./views/Members";
import Profile from "./views/Profile";
import { UserProvider } from "./context/UserContext";
import AuthWrapper from "./components/AuthWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: (
      <AuthWrapper>
        <Home />
      </AuthWrapper>
    ),
  },
  {
    path: "/events",
    element: (
      <AuthWrapper>
        <Events />
      </AuthWrapper>
    ),
  },
  {
    path: "/members",
    element: (
      <AuthWrapper>
        <Members />
      </AuthWrapper>
    ),
  },
  {
    path: "/about",
    element: (
      <AuthWrapper>
        <About />
      </AuthWrapper>
    ),
  },
  {
    path: "/profile/:uid",
    element: (
      <AuthWrapper>
        <Profile />
      </AuthWrapper>
    ),
  },
]);

function App() {
  return (
    <React.Fragment>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
