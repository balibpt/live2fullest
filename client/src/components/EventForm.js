import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import { v4 } from "uuid";

const EventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const attendanceCount = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `events/${image.name + v4()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const eventData = {
        title,
        description,
        location,
        date,
        time,
        image: imageUrl,
        attendanceCount,
      };
      onSubmit(eventData);
      // Reset form fields
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setTime("");
      setImage(null);
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block font-bold mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block font-bold mb-2">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block font-bold mb-2">
          Time
        </label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block font-bold mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
