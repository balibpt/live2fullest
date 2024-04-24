import React, { useState, useEffect } from "react";
import landingImage from "../assets/images/landingImage.jpeg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const LandingPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getContainerClasses = () => {
    if (screenWidth >= 5120) {
      return "max-w-7xl h-screen-5k";
    } else if (screenWidth >= 3840) {
      return "max-w-7xl h-screen-4k";
    } else if (screenWidth >= 2560) {
      return "max-w-7xl h-screen-1440p";
    } else {
      return "max-w-7xl h-screen-1080p";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#5EBAFB] via-[#EE44F7] to-[#5EBAFB] p-4 sm:p-6 md:p-8 lg:p-12">
      <div
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-center w-full ${getContainerClasses()}`}
      >
        <div className="w-full md:w-1/2 h-full p-8 md:p-12 lg:p-16">
          <img
            src={landingImage}
            alt="landing"
            className="max-w-full h-full object-cover object-center rounded-2xl "
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5EBAFB] via-[#EE44F7] to-[#5EBAFB] mb-8">
              Live2Fullest
            </h1>
            {signIn ? (
              <SignIn onSwitch={() => setSignIn(false)} />
            ) : (
              <SignUp onSwitch={() => setSignIn(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
