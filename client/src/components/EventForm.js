import React, { useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import { v4 } from "uuid";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Autocomplete as GoogleAutocomplete } from "@react-google-maps/api";

const EventForm = ({ onSubmit, foundingMembers = [], members = [] }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [location, setLocation] = useState("");
  const [additionalLocationInfo, setAdditionalLocationInfo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [hostSpeakerType, setHostSpeakerType] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const attendanceCount = 0;

  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setSelectedPlace(place);
      setLocation(place.formatted_address);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `events/${image.name + v4()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      const eventData = {
        title,
        description,
        location: selectedPlace.formatted_address,
        locationUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          selectedPlace.formatted_address
        )}`,
        additionalLocationInfo,
        date,
        time,
        image: imageUrl,
        attendanceCount,
        hostSpeakerType,
        hostSpeakerId: selectedMember ? selectedMember?.uid : null,
        speakerName: selectedMember ? "" : speakerName,
        attendees: [],
      };
      onSubmit(eventData);

      setTitle("");
      setDescription("");
      setLocation("");
      setAdditionalLocationInfo("");
      setDate("");
      setTime("");
      setImage(null);
      setHostSpeakerType("");
      setSelectedMember(null);
      setSpeakerName("");
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  const getMemberOptions = () => {
    if (hostSpeakerType === "foundingMember") {
      return foundingMembers;
    } else if (hostSpeakerType === "member") {
      return members;
    }
    return [];
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
        <GoogleAutocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
          options={{
            componentRestrictions: { country: "sg" },
            fields: ["formatted_address", "geometry"],
            types: ["geocode"],
          }}
        >
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </GoogleAutocomplete>
      </div>
      <div className="mb-4">
        <label
          htmlFor="additionalLocationInfo"
          className="block font-bold mb-2"
        >
          Additional Location Info
        </label>
        <input
          type="text"
          id="additionalLocationInfo"
          value={additionalLocationInfo}
          onChange={(e) => setAdditionalLocationInfo(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
      <div className="mb-4">
        <label className="block font-bold mb-2">Host/Speaker Type</label>
        <div>
          <label>
            <input
              type="radio"
              value="foundingMember"
              checked={hostSpeakerType === "foundingMember"}
              onChange={(e) => setHostSpeakerType(e.target.value)}
            />
            Founding Member
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="member"
              checked={hostSpeakerType === "member"}
              onChange={(e) => setHostSpeakerType(e.target.value)}
            />
            Member
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value=""
              checked={!hostSpeakerType}
              onChange={(e) => setHostSpeakerType("")}
            />
            None
          </label>
        </div>
      </div>
      {hostSpeakerType && (
        <div className="mb-4">
          <label htmlFor="hostSpeaker" className="block font-bold mb-2">
            Host/Speaker
          </label>
          <Autocomplete
            id="hostSpeaker"
            options={getMemberOptions()}
            getOptionLabel={(option) =>
              option.firstName + " " + option.lastName
            }
            value={selectedMember}
            onChange={(event, newValue) => setSelectedMember(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Host/Speaker"
                variant="outlined"
              />
            )}
          />
        </div>
      )}

      {!hostSpeakerType && (
        <div className="mb-4">
          <label htmlFor="speakerName" className="block font-bold mb-2">
            Speaker/Host Name
          </label>
          <input
            type="text"
            id="speakerName"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      )}
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
