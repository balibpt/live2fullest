import React, { useState } from "react";
import landingImage from "../assets/images/landingImage.png";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const LandingPage = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className={`h-screen ${signIn ? "p-12" : "mb-12 py-4 px-12"}`}>
      <div className="bg-[#F0F0F0] flex min-h-full rounded-[48px] border-2 shadow-2xl">
        <div className="w-1/2 bg-white rounded-[48px] flex flex-col justify-center items-center">
          <img src={landingImage} alt="landing" className="" />
        </div>
        <div className="w-1/2 py-10 px-20">
          <div className="flex flex-col items-center justify-evenly min-h-full">
            <h1 className="text-4xl text-center font-pacifico mb-20">
              Live2Fullest
            </h1>
            <h3 className="text-2xl text-gray-500 mb-10">
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
