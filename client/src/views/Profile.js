import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-config";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfileIcon from "../assets/icons/ProfileIcon";

const Profile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
  });
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const fetchUser = async () => {
      try {
        const q = query(usersCollectionRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUser(userData);
          setFormData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            jobTitle: userData.jobTitle || "",
            description: userData.description || "",
            resumeURL: userData.resumeURL || "",
            socialLinks: userData.socialLinks || {
              whatsapp: "",
              telegram: "",
              facebook: "",
              discord: "",
              linkedin: "",
              instagram: "",
            },
          });
        } else {
          console.log("User document not found!");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [uid]);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirmEdit = async () => {
    try {
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value,
      },
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
                  {user.photoURL ? (
                    <img
                      className="w-32 h-32 rounded-full"
                      src={user.photoURL}
                      alt="Profile"
                    />
                  ) : (
                    <ProfileIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                {currentUser.uid === uid && (
                  <button
                    onClick={handleEditProfile}
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-8">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="block w-full border-b-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full border-b-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      placeholder="Last Name"
                    />
                  </>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h2>
                )}
                {isEditing ? (
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="block w-full border-b-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    placeholder="Job Title"
                  />
                ) : (
                  <p className="text-gray-600">
                    {user.jobTitle || "Add a job title/title"}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Social Links
                </h3>
                {Object.entries(formData.socialLinks).map(([platform, url]) => (
                  <div key={platform} className="flex items-center mb-2">
                    {isEditing ? (
                      <input
                        type="text"
                        name={platform}
                        value={url}
                        onChange={(e) =>
                          handleSocialLinkChange(platform, e.target.value)
                        }
                        className="block w-full border-b-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        placeholder={`${platform} URL`}
                      />
                    ) : url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <img
                          className="w-6 h-6 mr-2"
                          src={`/${platform}.svg`}
                          alt={platform}
                        />
                        {platform}
                      </a>
                    ) : null}
                  </div>
                ))}
                {!isEditing && (
                  <p className="text-gray-500 text-sm">
                    Link your social media accounts
                  </p>
                )}
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About Me
              </h2>
              {isEditing ? (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="block w-full border-b-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  rows={5}
                  placeholder="Write a brief description about yourself"
                />
              ) : (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {user.description ||
                    "Add a short description/intro about yourself"}
                </p>
              )}
              {(user.resumeURL || isEditing) && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Resume
                  </h3>
                  {isEditing ? (
                    <input
                      type="file"
                      name="resumeURL"
                      accept=".doc,.docx,.pdf"
                      onChange={handleInputChange}
                      className="block w-full border-b-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    />
                  ) : user.resumeURL ? (
                    <a
                      href={user.resumeURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Upload a resume or detailed document about yourself
                    </p>
                  )}
                </div>
              )}
              {isEditing && (
                <div className="mt-8">
                  <button
                    onClick={handleConfirmEdit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
