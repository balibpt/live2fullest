import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  getDocs,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import EventForm from "../components/EventForm.js";
import { getAuth } from "firebase/auth";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [foundingMembers, setFoundingMembers] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const usersCollectionRef = collection(db, "users");

    async function checkAdmin() {
      const q = query(usersCollectionRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const isAdmin = userData.admin || false;
        setIsAdmin(isAdmin);
      } else {
        console.log("User document not found!");
      }
    }

    async function getFoundingMembers() {
      const q = query(usersCollectionRef, where("founderMember", "==", true));
      const querySnapshot = await getDocs(q);
      const foundingMembersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoundingMembers(foundingMembersData);
    }

    async function getMembers() {
      const q = query(usersCollectionRef, where("member", "==", true));
      const querySnapshot = await getDocs(q);
      const membersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(membersData);
    }

    checkAdmin();
    getFoundingMembers();
    getMembers();
  }, []);

  useEffect(() => {
    const eventsCollection = collection(db, "events");
    const eventsQuery = query(eventsCollection);
    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      events.map((event) => {
        return event;
      });
    });

    return () => unsubscribe();
  }, []);

  const handleCreateEvent = async (eventData) => {
    try {
      const eventsCollection = collection(db, "events");
      const docRef = await addDoc(eventsCollection, eventData);
      console.log("Event created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  const handleUpdateEvent = async (eventId, updatedEventData) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, updatedEventData);
      console.log("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);
      console.log("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 pl-2">Events</h1>
        {isAdmin && (
          <EventForm
            onSubmit={handleCreateEvent}
            foundingMembers={foundingMembers}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              foundingMembers={foundingMembers}
              members={members}
              onUpdate={handleUpdateEvent}
              onDelete={handleDeleteEvent}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Events;
