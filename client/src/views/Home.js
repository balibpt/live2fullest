import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PaintIcon from "../assets/icons/PaintIcon.js";
import LightIcon from "../assets/icons/LightIcon.js";
import GlobeIcon from "../assets/icons/Globe.js";
// import homeImg from "../assets/images/homeImage.jpeg";

const Home = () => {
  return (
    <React.Fragment>
      <div>
        <NavBar />
        <div className="">
          <div
            className="h-50vh flex items-center justify-center border-b-2 mb-4 bg-cover bg-center bg-no-repeat bg-opacity-25 bg-[#ECEDED]"
            // style={{
            //   backgroundImage: `url(${homeImg})`,
            // }}
          >
            <div className="px-20 w-2/3 text-center">
              <h1 className="text-4xl pb-5 font-semibold text-black">
                Choose Your Path, Set Your Pace
              </h1>
              <p className=" font-bold text-black">
                Where passion meets potential. Dive into a community of
                visionaries and creators, collaborating for personal and
                societal transformation. Elevate your journey in a space where
                every experience enriches your story.
              </p>
            </div>
          </div>
          <div className="px-20 mb-8">
            <div>
              <h1 className="text-4xl text-center mb-8 mt-8">Our Mission</h1>
              <p className="text-center mb-8">
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
            </div>
            <div>
              <div className="flex justify-between py-8">
                <div className="w-1/3 bg-[#ECEDED]  mr-4 rounded-2xl shadow-xl border-2">
                  <div className="p-6 flex flex-col items-center">
                    <PaintIcon className="w-auto h-24" />
                    <h3 className="font-semibold text-lg mt-5 mb-2">
                      Avocation
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Discover and delve into activities that fuel your passion,
                      hone your skills in a supportive space, and explore your
                      hobbies to the fullest.
                    </p>
                  </div>
                </div>

                <div className="w-1/3 bg-[#ECEDED] mr-4 rounded-2xl shadow-xl border-2">
                  <div className="p-6 flex flex-col items-center">
                    <GlobeIcon className="w-auto h-24" />
                    <h3 className="font-semibold text-lg mt-5 mb-2">
                      Giving Back
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Engage in meaningful initiatives to give back to the
                      community, share your expertise, and make a lasting,
                      positive impact.
                    </p>
                  </div>
                </div>

                <div className="w-1/3 bg-[#ECEDED] rounded-2xl shadow-xl border-2">
                  <div className="p-6 flex flex-col items-center">
                    <LightIcon className="w-auto h-24" />
                    <h3 className="font-semibold text-lg mt-5 mb-2">
                      Professional Growth
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Elevate your career through continuous learning,
                      professional development opportunities, and networking
                      with peers and industry leaders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Home;
