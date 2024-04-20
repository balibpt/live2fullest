import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  getDocs,
  where,
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
        // Perform actions based on the admin status
      } else {
        console.log("User document not found!");
      }
    }

    checkAdmin();
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
  }, [events]);

  const handleCreateEvent = async (eventData) => {
    // Create a new event document in Firestore
    // You can use the `addDoc` function from the Firestore library
    // Example:
    // addDoc(collection(db, "events"), eventData);
    try {
      // Create a new event document in Firestore
      const eventsCollection = collection(db, "events");
      const docRef = await addDoc(eventsCollection, eventData);
      console.log("Event created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Events</h1>
        {isAdmin && <EventForm onSubmit={handleCreateEvent} />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Events;
