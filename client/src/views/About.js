import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div>
        <h1 className="text-4xl">About</h1>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
