import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const Members = () => {
  const foundingMembers = [
    {
      name: "Suiniaty Basirun",
      jobTitle: "Co-Founder",
      description:
        "Suiniaty is a passionate entrepreneur with a vision to create a vibrant community of like-minded individuals. With her extensive experience in business development and community building, she brings valuable insights and leadership to Live2Fullest.",
      image: "",
    },
    {
      name: "Suwandi Tok",
      jobTitle: "Co-Founder",
      description:
        "Suwandi is a tech enthusiast and strategic thinker. With his keen eye for innovation and his ability to drive growth, he plays a crucial role in shaping the direction and success of Live2Fullest.",
      image: "", // Empty string or missing image URL
    },
    {
      name: "Raymond Teo",
      jobTitle: "Master of Exercise Science",
      description:
        "Raymond is a highly qualified exercise science professional with a passion for helping individuals achieve their health and fitness goals. His expertise and dedication make him an invaluable member of the Live2Fullest founding team.",
      image: "",
    },
  ];

  const members = [
    {
      name: "Jasmine Lee",
      jobTitle: "Marketing Specialist",
      description:
        "Jasmine is a creative and data-driven marketing specialist. She brings a fresh perspective and innovative ideas to help promote Live2Fullest and engage our community.",
      image: "", // Empty string or missing image URL
    },
  ];

  const renderProfileImage = (image) => {
    if (image) {
      return (
        <img
          src={image}
          alt="Member Profile"
          className="w-20 h-20 rounded-full mr-6"
        />
      );
    } else {
      return (
        <svg
          className="w-20 h-20 text-gray-400 rounded-full mr-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Our Members</h1>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-8">Founding Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {foundingMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    {renderProfileImage(member.image)}
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-gray-600">{member.jobTitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-8">Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {members.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    {renderProfileImage(member.image)}
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-gray-600">{member.jobTitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Members;
