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
import { Wrapper } from "@googlemaps/react-wrapper";

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
  const libraries = ["places"];
  return (
    <React.Fragment>
      <Wrapper
        apiKey={process.env.REACT_APP_FIREBASE_API_KEY}
        libraries={libraries}
      >
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
