import React, { useState } from "react";
import GoogleIcon from "../assets/icons/GoogleIcon.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/app";

const SignIn = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User signed in successfully", user);
          navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <React.Fragment>
      <div className="w-3/4">
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 mb-8 group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 mb-2 group ">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <div className="text-end text-gray-400 underline mb-8">
              <a href=" ">Forgot password?</a>
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="bg-[#686968] py-3 rounded-[48px] text-white w-1/2 hover:bg-gray-800"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex-1 border-t border-gray-800"></div>
          <span>or</span>
          <div className="flex-1 border-t border-gray-800"></div>
        </div>
        <div className="flex justify-center px-4">
          <button className="bg-transparent py-2 md:py-3 text-black w-full sm:w-auto flex items-center justify-center">
            <GoogleIcon className="w-6 h-6 mx-2" />
            <span className="text-sm md:text-base mx-2">
              Continue with Google
            </span>
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <span className="mr-1">New Members?</span>
        <button onClick={onSwitch} className="text-gray-400 underline">
          Create Account
        </button>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
