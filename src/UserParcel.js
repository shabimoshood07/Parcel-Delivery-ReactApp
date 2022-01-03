import React, { useState } from "react";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Modal from "./Modal";
import axios from "axios";

function UserParcel({
  _id,
  destination,
  presentLocation,
  status,
  getUserParcel,
  setLoading,
  setDeleted,
  // deleteParcel,
}) {
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  const editParcel = (id) => {
    setShow(true);
  };

  const deleteParcel = async (id) => {
    try {
      const path = await axios.delete(
        `https://parcel-delivery.herokuapp.com/api/v1/parcels/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleted(true);
      setLoading(true);
      getUserParcel();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="parcel-container">
        <div className="parcel-heading">
          <div className="title-heading">
            <button
              className="icon-btn toggle-btn"
              onClick={() => setShowInfo(!showInfo)}
            >
              {showInfo ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <p>iD: {_id}</p>
          </div>
          <div className="icon">
            <button
              className="icon-btn delete-btn"
              onClick={() => deleteParcel(_id)}
            >
              <FaTrash />
            </button>
            <button
              className="icon-btn edit-btn"
              onClick={() => editParcel(_id)}
            >
              <FaEdit />
            </button>
          </div>
        </div>
        {showInfo && (
          <div className="parcel-details">
            <h4>
              Destination: <span>{destination}</span>
            </h4>
            <h4>
              Present location: <span>{presentLocation}</span>
            </h4>
            <h4>
              Status: <span>{status}</span>
            </h4>
          </div>
        )}
      </div>

      <Modal
        setShow={setShow}
        show={show}
        id={_id}
        getUserParcel={getUserParcel}
        setLoading={setLoading}
      />
    </>
  );
}
export default UserParcel;
