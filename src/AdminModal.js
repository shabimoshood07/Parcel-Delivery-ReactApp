import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminModal({
  id,
  show,
  setShow,
  setLoading,
  getParcel,
  statusParcel,
}) {
  const token = JSON.parse(localStorage.getItem("token"));

  const [presentLocation, setPresentLocation] = useState("");
  const [status, setStatus] = useState(
    JSON.stringify(statusParcel).slice(1, -1)
  );
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  const closeAdminModal = () => {
    setLoading(true);
    getParcel();
    setShow(false);
  };

  /*/ ////////// //
UPDATE PARCEL
/////////////*/

  const updateParcel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://parcel-delivery.herokuapp.com/api/v1/parcels/${id}/presentLocation`,
        { presentLocation },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(data.msg);
    } catch (error) {
      setMsg(error.response.data.msg);
    }

    try {
      const parcelStatus = await axios.put(
        `https://parcel-delivery.herokuapp.com/api/v1/parcels/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPresentLocation("");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <div className="modal-container">
          <h1>Update Parcel</h1>
          <p>{msg}</p>
          <p>parcel ID: {id}</p>
          <form className="modal-form">
            <input
              type="text"
              placeholder="present Location...."
              value={presentLocation}
              onChange={(e) => {
                setPresentLocation(e.target.value);
              }}
            />
            <select
              name="status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              value={status}
            >
              <option value={status}>{status}</option>
              <option value="pickup station">pickup station</option>
              <option value="in-transit">in-transit</option>
              <option value="delivered">delivered</option>
            </select>
            <div className="modal-btn">
              <button onClick={closeAdminModal}>Close</button>

              <button type="submit" onClick={updateParcel}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminModal;
