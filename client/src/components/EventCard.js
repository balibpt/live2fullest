import React, { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase-config";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import EditEventModal from "../components/EditEventModal";

const EventCard = ({
  event,
  foundingMembers,
  members,
  onUpdate,
  onDelete,
  isAdmin,
}) => {
  const [isGoing, setIsGoing] = useState(false);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        console.log("User document not found!");
      }
    };

    fetchUserData();
  }, []);

  const handleToggleGoing = async () => {
    setIsGoing(!isGoing);
    const eventRef = doc(db, "events", event.id);
    if (isGoing) {
      await updateDoc(eventRef, {
        attendanceCount: event.attendanceCount - 1,
        attendees: arrayRemove(userData),
      });
    } else {
      await updateDoc(eventRef, {
        attendanceCount: event.attendanceCount + 1,
        attendees: arrayUnion(userData),
      });
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, {
      comments: arrayUnion({ user: userData, text: comment }),
    });
    setComment("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEventUpdate = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateEvent = async (updatedEventData) => {
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, updatedEventData);
    onUpdate(event.id, updatedEventData);
    setIsEditModalOpen(false);
  };

  const handleEventDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      onDelete(event.id);
    }
  };

  const getHostSpeakerName = (hostSpeakerId) => {
    const foundingMember = foundingMembers.find(
      ({ uid }) => uid === hostSpeakerId
    );
    return foundingMember
      ? foundingMember.firstName + " " + foundingMember.lastName
      : "N/A";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="mb-4">
        <p className="font-bold">
          Location:{" "}
          <a
            href={event.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {event.location}
          </a>
        </p>
        <p className="font-bold">
          Additional Location Info: {event.additionalLocationInfo}
        </p>
        <p className="font-bold">Date: {event.date ? event.date : "N/A"}</p>
        <p className="font-bold">Time: {event.date ? event.time : "N/A"}</p>
        <p className="font-bold">
          Host/Speaker:{" "}
          {event.hostSpeakerId ? (
            <a href={`/profile/${event.hostSpeakerId}`}>
              <span className="text-blue-500 underline">
                {getHostSpeakerName(event.hostSpeakerId)}
              </span>
            </a>
          ) : event.speakerName ? (
            event.speakerName
          ) : (
            "N/A"
          )}
        </p>
      </div>
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            isGoing ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={handleToggleGoing}
        >
          {isGoing ? "Going" : "Not Going"}
        </button>
        <p
          className="mt-2 underline text-blue-500 cursor-pointer"
          onClick={handleOpenModal}
        >
          {event.attendanceCount} people are going
        </p>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Attendees Modal"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <h2>Attendees: </h2>
          <ul>
            {event.attendees &&
              event.attendees.map((attendee, index) => (
                <li key={index}>
                  <Link to={`/profile/${attendee.uid}`}>
                    <span className="underline hover:text-gray-400">
                      {attendee.firstName} {attendee.lastName}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
          <button onClick={handleCloseModal}>Close</button>
        </Modal>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Comments:</h3>
        <div className="comments-container max-h-40 overflow-y-auto">
          {event.comments &&
            event.comments.map((comment, index) => (
              <p key={index} className="mb-2">
                <span
                  className={comment.user.admin === true ? "text-red-500" : ""}
                >
                  {comment.user.firstName}:{" "}
                </span>
                {comment.text}
              </p>
            ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
      {isAdmin && (
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={() => handleEventUpdate(event)}
          >
            Edit
          </button>
          <EditEventModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            event={event}
            onUpdate={handleUpdateEvent}
            foundingMembers={foundingMembers}
            members={members}
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleEventDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
