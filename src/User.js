import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserParcel from "./UserParcel";

import axios from "axios";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [parcels, setParcels] = useState([]);
  const [destination, setDestination] = useState("");
  const [createMsg, setCreateMsg] = useState("");
  const [deleted, setDeleted] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const userName = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();

  const createParcel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://parcel-delivery.herokuapp.com/api/v1/parcels",
        { destination: destination },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreateMsg("parcel created");

      // setLoading(true);
      getUserParcel();
      setDestination("");
    } catch (error) {
      setCreateMsg(error.response.data.msg);
      console.log(error.response);
    }
  };
  const getUserParcel = async () => {
    try {
      const { data } = await axios.get(
        "https://parcel-delivery.herokuapp.com/api/v1/parcels/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setParcels(data.parcel.parcel);
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigate("/");
    }
  };
  //   LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getUserParcel();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCreateMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [createMsg]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleted(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [deleted]);

  if (deleted) {
    return (
      <div className="deleted">
        <h1>Parcel deleted successfully!</h1>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading.......</h1>
      </div>
    );
  }

  if (parcels.length === 0) {
    return (
      <>
        <div className="user-parcels">
          <div className="user-parcel-heading">
            <h3>User - {token && <span>{userName.email}</span>}</h3>
            <button type="button" className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        <div className="create-parcel">
          <h2>Create Parcel</h2>
          <form className="create-parcel-form">
            <p>{createMsg}</p>
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination...."
            />
            <button type="submit" onClick={createParcel}>
              Create
            </button>
          </form>
        </div>
        <h1>You have no Parcels</h1>
      </>
    );
  }
  return (
    <>
      <section>
        <div className="user-parcel-heading">
          <h3>User - {token && <span>{userName.email}</span>}</h3>
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="create-parcel">
          <h2>Create Parcel</h2>

          <form className="create-parcel-form">
            <p>{createMsg}</p>
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination...."
            />
            <button type="submit" onClick={createParcel}>
              Create
            </button>
          </form>
        </div>
        <div className="user-parcels">
          <h2>User Parcels</h2>
          <div>
            {parcels.map((parcel) => {
              return (
                <UserParcel
                  key={parcel._id}
                  // deleteParcel={deleteParcel}
                  {...parcel}
                  getUserParcel={getUserParcel}
                  setLoading={setLoading}
                  setDeleted={setDeleted}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default User;
