import React, { useState } from "react";
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from "react-icons/fa";

import axios from "axios";

function Delivered({
  _id,
  destination,
  presentLocation,
  status,
  receiver,
  receiverNumber,
  pickupLocation,
  price,
  getUserParcel,
  setLoading,
  setDeleted,
  setDestination,
  setPickupLocation,
  setRecipient,
  setRecipientNumber,
  setWeight,
  // deleteParcel,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
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
      setPickupLocation("");
      setRecipient("");
      setRecipientNumber("");
      setWeight("");
      setDestination("");
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
          </div>
        </div>
        {showInfo && (
          <div className="parcel-details">
            <h4>
              Pickup Location: <span>{pickupLocation}</span>
            </h4>
            <h4>
              Destination: <span>{destination}</span>
            </h4>
            <h4>
              Recipient: <span>{receiver}</span>
            </h4>
            <h4>
              Recipient Number: <span>{receiverNumber}</span>
            </h4>
            <h4>
              Present location: <span>{presentLocation}</span>
            </h4>
            <h4>
              Status: <span>{status}</span>
            </h4>
            <h4>
              Price<strong>(N)</strong>: <span>{price}</span>
            </h4>
          </div>
        )}
      </div>
    </>
  );
}

export default Delivered;
