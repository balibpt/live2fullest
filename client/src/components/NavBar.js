import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProfileIcon from "../assets/icons/ProfileIcon";

const NavBar = () => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setCurrentUser(userData);
        }
      }
    };

    fetchCurrentUser();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
      <nav className="bg-white border-b-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-transparent bg-gradient-to-r from-[#5EBAFB] via-[#EE44F7] to-[#5EBAFB] bg-clip-text font-['Roboto',_sans-serif]">
            <Link to="/home">Live2Fullest</Link>
          </span>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                {currentUser && currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <ProfileIcon className="w-10 h-10 text-gray-400 rounded-full" />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                  {currentUser && (
                    <Link
                      to={`/profile/${currentUser.uid}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded={isOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`w-5 h-5 ${isOpen ? "hidden" : "block"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <svg
                className={`w-5 h-5 ${isOpen ? "block" : "hidden"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 1L1 13M1 1l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isOpen ? "block" : "hidden"
            }`}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/home"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/members"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
