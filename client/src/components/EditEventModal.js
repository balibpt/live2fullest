import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Autocomplete as GoogleAutocomplete } from "@react-google-maps/api";

const EditEventModal = ({
  isOpen,
  onClose,
  event,
  onUpdate,
  foundingMembers,
  members,
}) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [additionalLocationInfo, setAdditionalLocationInfo] = useState(
    event.additionalLocationInfo
  );
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [speakerName, setSpeakerName] = useState(event.speakerName || "");
  const [hostSpeakerType, setHostSpeakerType] = useState(
    event.hostSpeakerType || ""
  );
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (event.hostSpeakerId) {
      const foundingMember = foundingMembers.find(
        (member) => member.uid === event.hostSpeakerId
      );
      const member = members.find(
        (member) => member.uid === event.hostSpeakerId
      );
      setSelectedMember(foundingMember || member || null);
    } else {
      setSelectedMember(null);
    }
  }, [event.hostSpeakerId, foundingMembers, members]);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setSelectedPlace(place);
      setLocation(place.formatted_address);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEventData = {
      title,
      description,
      location: selectedPlace ? selectedPlace.formatted_address : location,
      locationUrl: selectedPlace
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            selectedPlace.formatted_address
          )}`
        : "",
      additionalLocationInfo,
      date,
      time,
      hostSpeakerType,
      hostSpeakerId: hostSpeakerType ? selectedMember?.uid : null,
      speakerName: hostSpeakerType ? "" : speakerName,
    };
    onUpdate(updatedEventData);
    onClose();
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Event Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">
            Location:
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
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </GoogleAutocomplete>
        </div>
        <div className="mb-4">
          <label htmlFor="additionalLocationInfo" className="block mb-2">
            Additional Location Info:
          </label>
          <input
            type="text"
            id="additionalLocationInfo"
            value={additionalLocationInfo}
            onChange={(e) => setAdditionalLocationInfo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block mb-2">
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Host/Speaker Type</label>
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
            <label htmlFor="hostSpeaker" className="block mb-2">
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
            <label htmlFor="speakerName" className="block mb-2">
              Speaker/Host Name
            </label>
            <input
              type="text"
              id="speakerName"
              value={speakerName}
              onChange={(e) => setSpeakerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditEventModal;
