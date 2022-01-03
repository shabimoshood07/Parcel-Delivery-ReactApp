import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Parcel from "./Parcel";

function Admin() {
  const [loading, setLoading] = useState(true);
  const [parcels, setParcels] = useState([]);
  const [delivered, setDelivered] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));
  let navigate = useNavigate();

  const getParcel = async () => {
    try {
      const { data } = await axios.get(
        "https://parcel-delivery.herokuapp.com/api/v1/parcels",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log(data.parcels.parcels);
      setParcels(data.parcels.parcels);
    } catch (error) {
      setLoading(false);
      navigate("/");
      console.log(error.response);
    }
  };

  useEffect(() => {
    getParcel();
  }, []);

  //   LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading.......</h1>
      </div>
    );
  }
  return (
    <div className="parcels">
      <div className="admin-heading">
        <h2>Welcome Admin</h2>
        <button type="button" className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="user-parcels">
        <h2>User Parcels</h2>
        {parcels.map((parcel) => {
          return (
            <Parcel
              key={parcel._id}
              {...parcel}
              setLoading={setLoading}
              getParcel={getParcel}
              delivered={delivered}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
