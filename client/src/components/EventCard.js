import React, { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase-config";

const EventCard = ({ event }) => {
  const [isGoing, setIsGoing] = useState(false);
  const [comment, setComment] = useState("");

  const handleToggleGoing = async () => {
    setIsGoing(!isGoing);
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, {
      attendanceCount: isGoing
        ? event.attendanceCount - 1
        : event.attendanceCount + 1,
    });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const eventRef = doc(db, "events", event.id);
    await updateDoc(eventRef, {
      comments: arrayUnion(comment),
    });
    setComment("");
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
        <p className="font-bold">Location: {event.location}</p>
        <p className="font-bold">Date: {event.date ? event.date : "N/A"}</p>
        <p className="font-bold">Time: {event.date ? event.time : "N/A"}</p>
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
        <p className="mt-2">{event.attendanceCount} people are going</p>
      </div>
      <div className="mb-4">
        <h3 className="font-bold mb-2">Comments:</h3>
        {event.comments &&
          event.comments.map((comment, index) => (
            <p key={index} className="mb-2">
              {comment}
            </p>
          ))}
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
    </div>
  );
};

export default EventCard;
