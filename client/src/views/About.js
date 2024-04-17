import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import homeImage from "../assets/images/homeImage.jpeg";

const AboutPage = () => {
  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="container mx-auto px-4 py-12">
          <section className="mb-20">
            <h1 className="text-4xl font-bold mb-8 text-center">Who We Are</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                <p className="text-gray-600 mb-8">
                  Live2Fullest Pte. Ltd. was founded in 2024 by Suiniaty Basirun
                  and Suwandi Tok with a vision to create a vibrant community of
                  passionate individuals who come together to unlock their full
                  potential and make a positive impact on society. We believe in
                  the power of collaboration, learning, and personal growth.
                </p>
                <div className="flex items-center">
                  <svg
                    className="w-8 h-8 text-indigo-600 mr-4"
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
                  <p className="text-gray-600">
                    Incorporated in Singapore and registered with ACRA
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src={homeImage}
                  alt="About Live2Fullest"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-70 rounded-lg"></div>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <img
                  src={homeImage}
                  alt="Transparency"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-70 rounded-lg"></div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-semibold mb-4">Transparency</h2>
                <p className="text-gray-600 mb-8">
                  At Live2Fullest, we believe in full transparency. During our
                  Annual General Meeting (AGM), members have access to the
                  company's detailed financial information. We maintain an open
                  and honest relationship with our community, fostering trust
                  and accountability.
                </p>
                <div className="flex items-center">
                  <svg
                    className="w-8 h-8 text-blue-600 mr-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <p className="text-gray-600">
                    Full financial transparency to our members
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-8">Meet the Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg">
                <img
                  src={homeImage}
                  alt="Founder 1"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2">
                    Suiniaty Basirun
                  </h3>
                  <p className="text-gray-600 mb-4">Co-Founder</p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla vel ante sit amet leo imperdiet porta. Mauris
                    elementum finibus ligula, ut tempus quam interdum et. Fusce
                    porttitor convallis nulla, at dapibus eros tristique vel.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg">
                <img
                  src={homeImage}
                  alt="Founder 2"
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-2">Suwandi Tok</h3>
                  <p className="text-gray-600 mb-4">Co-Founder</p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla vel ante sit amet leo imperdiet porta. Mauris
                    elementum finibus ligula, ut tempus quam interdum et. Fusce
                    porttitor convallis nulla, at dapibus eros tristique vel.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default AboutPage;
