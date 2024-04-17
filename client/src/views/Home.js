import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PaintIcon from "../assets/icons/PaintIcon.js";
import LightIcon from "../assets/icons/LightIcon.js";
import GlobeIcon from "../assets/icons/Globe.js";
import homeImage from "../assets/images/homeImage.jpeg";

const Home = () => {
  return (
    <React.Fragment>
      <div>
        <NavBar />
        <div className="">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-6">
                  Choose Your Path, Set Your Pace
                </h1>
                <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                  Where passion meets potential. Dive into a community of
                  visionaries and creators, collaborating for personal and
                  societal transformation. Elevate your journey in a space where
                  every experience enriches your story.
                </p>
                <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">
                Our Mission
              </h2>
              <p className="text-xl text-center mb-16">
                Our mission at Live2Fullest is to inspire a symphony of
                collaborative growth and collective impact. We believe in the
                power of shared knowledge and the ripple effect of individual
                empowerment. By fostering a sanctuary for learning, creativity,
                and innovation, we strive to enrich lives, encouraging every
                member to weave their unique thread into the vibrant tapestry of
                our global community. Together, we are charting a course towards
                a future where living fully becomes a shared adventure, and
                every step forward is a stride towards societal enrichment.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center justify-center mb-6">
                    <PaintIcon className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-4">
                    Avocation
                  </h3>
                  <p className="text-gray-600 text-center">
                    Discover and delve into activities that fuel your passion,
                    hone your skills in a supportive space, and explore your
                    hobbies to the fullest.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center justify-center mb-6">
                    <GlobeIcon className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-4">
                    Giving Back
                  </h3>
                  <p className="text-gray-600 text-center">
                    Engage in meaningful initiatives to give back to the
                    community, share your expertise, and make a lasting,
                    positive impact.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center justify-center mb-6">
                    <LightIcon className="w-12 h-12 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-center mb-4">
                    Professional Growth
                  </h3>
                  <p className="text-gray-600 text-center">
                    Elevate your career through continuous learning,
                    professional development opportunities, and networking with
                    peers and industry leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="px-20 mb-8 py-10">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              As Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">
                    Participate in Events
                  </h3>
                </div>
                <p className="text-gray-600">
                  Choose and attend events that align with your interests and
                  passions.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Invite Others</h3>
                </div>
                <p className="text-gray-600">
                  Invite like-minded individuals to join Live2Fullest and expand
                  our community.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Lead or Co-Lead</h3>
                </div>
                <p className="text-gray-600">
                  Take the lead or collaborate in areas of your interest or
                  expertise.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">
                    Represent Live2Fullest
                  </h3>
                </div>
                <p className="text-gray-600">
                  Represent Live2Fullest externally in project-specific roles.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Offer Services</h3>
                </div>
                <p className="text-gray-600">
                  Offer your professional services for a fee as a Service
                  Partner.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full p-3 mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Conduct Business</h3>
                </div>
                <p className="text-gray-600">
                  Use Live2Fullest to conduct your business transactions by
                  paying a service partner's fee.
                </p>
              </div>
            </div>
          </section>
          <section className="px-20 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg py-12 px-8">
              <h2 className="text-3xl font-semibold mb-6 text-white">
                Become a Founding Member
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white mb-8">
                    As a founding member, you will provide leadership in shaping
                    Live2Fullest into a community that has a positive impact on
                    each member and our society.
                  </p>
                  <ul className="text-white mb-8">
                    <li className="flex items-start mb-4">
                      <svg
                        className="w-6 h-6 mr-2 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Shape the direction and impact of Live2Fullest
                      </span>
                    </li>
                    <li className="flex items-start mb-4">
                      <svg
                        className="w-6 h-6 mr-2 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Contribute to the growth and development of the
                        community
                      </span>
                    </li>
                    <li className="flex items-start mb-4">
                      <svg
                        className="w-6 h-6 mr-2 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Participate in exclusive founding member events and
                        discussions
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-4">
                    Annual Membership Fee
                  </h3>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold">$180</span>
                    <span className="text-gray-600 ml-2">/ year</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Your annual membership fee allows you to participate in 4
                    local events of your interest.
                  </p>
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-md w-full">
                    Join as a Founding Member
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
