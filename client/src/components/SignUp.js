import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config.js";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState({});
  const [formValidated, setFormValidated] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (value !== password) {
      setError({ ...error, confirmPassword: "Passwords do not match" });
    } else {
      setError({ ...error, confirmPassword: "" });
    }
  };

  const validateFirstName = (firstName) => {
    if (firstName === "") {
      setError({ ...error, firstName: "First name is required" });
    } else {
      setError({ ...error, firstName: "" });
    }
  };

  const validateLastName = (lastName) => {
    if (lastName === "") {
      setError({ ...error, lastName: "Last name is required" });
    } else {
      setError({ ...error, lastName: "" });
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    validateFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    validateLastName(e.target.value);
  };

  const usersCollection = collection(db, "users");
  const addUser = async (user) => {
    await addDoc(usersCollection, user);
  };

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validateEmail = (email) => {
    if (email.match(emailRegex) === null) {
      setError({ ...error, email: "Email is not valid" });
    } else {
      setError({ ...error, email: "" });
    }
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const validatePassword = (password) => {
    if (password.match(passwordRegex) === null) {
      setError({
        ...error,
        password:
          "Password must contain at least 6 characters, uppercase, lowercase, numbers & special characters",
      });
    } else {
      setError({ ...error, password: "" });
    }
  };

  useEffect(() => {
    if (
      error.email ||
      error.password ||
      error.confirmPassword ||
      error.firstName ||
      error.lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
      setFormValidated(false);
    } else {
      setFormValidated(true);
    }
  }, [error, email, password, confirmPassword, firstName, lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addUser({
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          jobTitle: "",
          description: "",
          resumeURL: "",
          socialLinks: {
            whatsapp: "",
            telegram: "",
            facebook: "",
            discord: "",
            linkedin: "",
            instagram: "",
          },
          founderMember: true,
          admin: false,
        });
      })
      .then(() => {
        console.log("User created successfully");
        return setPersistence(auth, browserLocalPersistence);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        setError({ ...error, auth: error.message });
      });
  };

  return (
    <React.Fragment>
      <div className="w-3/4">
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              onChange={handleFirstNameChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              First name
            </label>
            <span>
              {error.firstName && (
                <span className="text-red-500 text-sm">{error.firstName}</span>
              )}
            </span>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              onChange={handleLastNameChange}
              className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=""
              required
            />
            <label className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Last name
            </label>
            <span>
              {error.lastName && (
                <span className="text-red-500 text-sm">{error.lastName}</span>
              )}
            </span>
          </div>
        </div>
        <div className="relative z-0 mb-4 group">
          <input
            type="email"
            onChange={handleEmailChange}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray</div>-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          <span>
            {error.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
          </span>
        </div>
        <div className="relative z-0 mb-4 group ">
          <input
            type="password"
            onChange={handlePasswordChange}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          <span>
            {error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
          </span>
        </div>
        <div className="relative z-0 mb-2 group ">
          <input
            type="password"
            onChange={handleConfirmPasswordChange}
            className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-900 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-md text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          <span>
            {error.confirmPassword && (
              <span className="text-red-500 text-sm">
                {error.confirmPassword}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center mb-5">
          <button
            onClick={handleSubmit}
            className="bg-[#686968] py-3 rounded-[48px] mt-8 text-white w-1/2 hover:bg-gray-800 hover:cusor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!formValidated}
          >
            Sign up
          </button>
          <span>
            {error.auth && (
              <span className="text-red-500 text-sm">{error.auth}</span>
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <span className="mr-1">Already have an account?</span>
        <button onClick={onSwitch} className="text-gray-400 underline">
          Sign in
        </button>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
