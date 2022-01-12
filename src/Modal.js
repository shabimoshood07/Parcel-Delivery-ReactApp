import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({
  setShow,
  show,
  editParcel,
  id,
  getUserParcel,
  setLoading,
  status,
}) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [destination, setDestination] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  if (!show) {
    return null;
  }
  const closeModal = () => {
    setShow(false);
    setLoading(true);
    getUserParcel();
  };

  const updateParcel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://parcel-delivery.herokuapp.com/api/v1/parcels/${id}/destination`,
        { destination: destination },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(data.msg);
      setDestination("");
    } catch (error) {
      console.log(error.response);
      setMsg(error.response.data.msg);
      setDestination("");
    }
  };
  return (
    <div className="modal">
      <div className="modal-header">
        <div className="modal-container">
          <h1>Update Destination</h1>
          <p>{msg}</p>
          <p>parcel ID: {id}</p>
          <form className="modal-form">
            <input
              type="destination"
              placeholder="parcel destination...."
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
            <div className="modal-btn">
              <button onClick={closeModal}>Close</button>

              <button type="submit" onClick={updateParcel}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
