import React, { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaChevronUp,
  FaChevronDown,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";
import AdminModal from "./AdminModal";

function Parcel({
  _id,
  destination,
  presentLocation,
  status,
  createdBy,
  setLoading,
  getParcel,
  delivered,
}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [showInfo, setShowInfo] = useState(false);
  const [show, setShow] = useState(false);

  // if (status === "delivered") {
  // }
  console.log(status);
  /*/ ////////// //
ADMIN DELETE PARCEL
/////////////*/
  const deleteParcel = async (id) => {
    try {
      await axios.delete(
        `https://parcel-delivery.herokuapp.com/api/v1/parcels/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(true);
      getParcel();
      console.log(id);
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
            <p>Id:{_id}</p>
          </div>
          <div className="icon">
            {delivered ? (
              <button className="icon-btn delivered-btn">
                <FaCheckCircle />
              </button>
            ) : (
              <button
                className="icon-btn delete-btn"
                onClick={() => deleteParcel(_id)}
              >
                <FaTrash />
              </button>
            )}
            <button className="icon-btn edit-btn" onClick={() => setShow(true)}>
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
            <h4>
              Created By: <span>{createdBy}</span>
            </h4>
          </div>
        )}
      </div>
      {show && (
        <AdminModal
          setShow={setShow}
          show={show}
          id={_id}
          getParcel={getParcel}
          setLoading={setLoading}
          statusParcel={status}
        />
      )}
    </>
  );
}

export default Parcel;
