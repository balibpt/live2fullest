import React, { useState } from "react";
import landingImage from "../assets/images/landingImage.png";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const LandingPage = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div
      className={`h-screen ${
        signIn ? "p-4 sm:p-6 md:p-12" : "py-4 px-4 sm:px-6 md:py-4 md:px-12"
      } flex items-center justify-center`}
    >
      <div className="bg-[#F0F0F0] flex flex-col md:flex-row h-full w-full max-w-7xl rounded-[48px] border-2 shadow-2xl overflow-auto">
        <div className="w-full md:w-1/2 bg-white rounded-[48px] flex items-center justify-center p-4 sm:p-8">
          <img src={landingImage} alt="landing" className="max-w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-8 md:p-12">
          <div className="flex flex-col items-center">
            <h1 className="self-center text-xl sm:text-2xl font-semibold whitespace-nowrap text-transparent bg-gradient-to-r from-[#5EBAFB] via-[#EE44F7] to-[#5EBAFB] bg-clip-text font-['Roboto',_sans-serif] mb-2 sm:mb-4">
              Live2Fullest
            </h1>
            <h3 className="text-lg sm:text-xl text-gray-500 mb-6 sm:mb-8 text-center">
              Welcome to Live2Fullest
            </h3>
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
