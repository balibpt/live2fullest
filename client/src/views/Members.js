import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfileIcon from "../assets/icons/ProfileIcon";
import { Link } from "react-router-dom";

const Members = () => {
  const [foundingMembers, setFoundingMembers] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const usersCollectionRef = collection(db, "users");

      // Fetch founding members
      const foundingMembersQuery = query(
        usersCollectionRef,
        where("founderMember", "==", true)
      );
      const foundingMembersSnapshot = await getDocs(foundingMembersQuery);
      const foundingMembersData = foundingMembersSnapshot.docs.map((doc) =>
        doc.data()
      );
      setFoundingMembers(foundingMembersData);

      // Fetch regular members
      const membersQuery = query(
        usersCollectionRef,
        where("founderMember", "==", false)
      );
      const membersSnapshot = await getDocs(membersQuery);
      const membersData = membersSnapshot.docs.map((doc) => doc.data());
      setMembers(membersData);
    };

    fetchMembers();
  }, []);

  const renderProfileImage = (photoURL) => {
    if (photoURL) {
      return (
        <img
          src={photoURL}
          alt="Member Profile"
          className="w-20 h-20 rounded-full mr-6"
        />
      );
    } else {
      return (
        <ProfileIcon className="w-20 h-20 text-gray-400 rounded-full mr-6" />
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
                <Link to={`/profile/${member.uid}`} key={index}>
                  <div className="bg-white rounded-lg shadow-lg p-8 hover:bg-gray-100 transition duration-300">
                    <div className="flex items-center mb-6">
                      {renderProfileImage(member.photoURL)}
                      <div>
                        <h3 className="text-xl font-semibold">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-gray-600">{member.jobTitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-semibold mb-8">Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {members.map((member, index) => (
                <Link to={`/profile/${member.uid}`} key={index}>
                  <div className="bg-white rounded-lg shadow-lg p-8 hover:bg-gray-100 transition duration-300">
                    <div className="flex items-center mb-6">
                      {renderProfileImage(member.photoURL)}
                      <div>
                        <h3 className="text-xl font-semibold">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-gray-600">{member.jobTitle}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </Link>
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
