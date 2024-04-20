import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db, storage } from "../firebase-config";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Modal from "react-modal";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfileIcon from "../assets/icons/ProfileIcon";
import DiscordIcon from "../assets/icons/DiscordIcon";
import FacebookIcon from "../assets/icons/FacebookIcon";
import WhatsappIcon from "../assets/icons/WhatsappIcon";
import TelegramIcon from "../assets/icons/TelegramIcon";
import LinkedinIcon from "../assets/icons/LinkedinIcon";
import InstagramIcon from "../assets/icons/InstagramIcon";

const Profile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
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
      const auth = getAuth();
      const user = auth.currentUser;
      const usersCollectionRef = collection(db, "users");

      const q = query(usersCollectionRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        await updateDoc(userDoc.ref, formData);
        setUser(formData);
        setIsEditing(false);
        // Show a loader animation while updating
        setIsUpdating(true);
        setTimeout(() => {
          setIsUpdating(false);
          window.location.reload(); // Refresh the page after successful update
        }, 2000); // Adjust the delay as needed
      } else {
        console.log("User document not found!");
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const handleInputChange = async (e) => {
    if (e.target.name === "resumeURL") {
      const file = e.target.files[0];
      if (file) {
        const storageRef = ref(storage, `users/${uid}/resume`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setFormData({
          ...formData,
          resumeURL: downloadURL,
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `users/${uid}/profile-image`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          await updateDoc(userDoc.ref, { photoURL: downloadURL });
          setUser((prevUser) => ({ ...prevUser, photoURL: downloadURL }));
        } else {
          console.log("User document not found!");
        }
      } catch (error) {
        console.log("Error updating user document:", error);
      }
    }
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
                      className="w-32 h-32 rounded-full object-cover"
                      src={user.photoURL}
                      alt="Profile"
                    />
                  ) : (
                    <ProfileIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                {currentUser.uid === uid && (
                  <>
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
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="profileImageInput"
                        />
                        <label
                          htmlFor="profileImageInput"
                          className="absolute bottom-0 left-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none cursor-pointer"
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
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </label>
                      </>
                    )}
                  </>
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
                      className="block w-full rounded-lg border-2 border-gray-300 py-2 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-2 border-gray-300 py-2 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500"
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
                    className="block w-full rounded-lg border-2 border-gray-300 py-2 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500"
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
                  <div key={platform} className="flex items-center mb-4">
                    {isEditing ? (
                      <input
                        type="text"
                        name={platform}
                        value={url}
                        onChange={(e) =>
                          handleSocialLinkChange(platform, e.target.value)
                        }
                        className="block w-full rounded-lg border-2 border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
                        placeholder={`${platform} URL`}
                      />
                    ) : url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                      >
                        {platform === "discord" && (
                          <DiscordIcon className="w-6 h-6 mr-2" />
                        )}
                        {platform === "facebook" && (
                          <FacebookIcon className="w-6 h-6 mr-2" />
                        )}
                        {platform === "whatsapp" && (
                          <WhatsappIcon className="w-6 h-6 mr-2" />
                        )}
                        {platform === "telegram" && (
                          <TelegramIcon className="w-6 h-6 mr-2" />
                        )}
                        {platform === "linkedin" && (
                          <LinkedinIcon className="w-6 h-6 mr-2" />
                        )}
                        {platform === "instagram" && (
                          <InstagramIcon className="w-6 h-6 mr-2" />
                        )}

                        <span>{platform}</span>
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
                  className="block w-full rounded-lg border-2 border-gray-300 py-2 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500"
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
                      accept=".pdf"
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border-2 border-gray-300 py-2 px-4 mb-4 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  ) : user.resumeURL ? (
                    <>
                      <button
                        onClick={() => setIsResumeModalOpen(true)}
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </button>
                      <Modal
                        isOpen={isResumeModalOpen}
                        onRequestClose={() => setIsResumeModalOpen(false)}
                        contentLabel="Resume Modal"
                        className="modal"
                        overlayClassName="modal-overlay"
                      >
                        <div className="modal-content">
                          <h2>Resume</h2>
                          {/* Render the resume content */}
                          <iframe
                            src={user.resumeURL}
                            width="100%"
                            height="500px"
                            title="Resume"
                          />
                          <button onClick={() => setIsResumeModalOpen(false)}>
                            Close
                          </button>
                        </div>
                      </Modal>
                    </>
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
                    className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
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
