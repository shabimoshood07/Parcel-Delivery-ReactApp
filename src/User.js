import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserParcel from "./UserParcel";
import Delivered from "./Delivered";
import axios from "axios";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [parcels, setParcels] = useState([]);
  const [deliveredParcels, setDeliveredParcels] = useState([]);
  const [notDeliveredParcels, setNotDeliveredParcels] = useState([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientNumber, setRecipientNumber] = useState("");
  const [weight, setWeight] = useState(0);
  const [amount, setAmount] = useState("");
  const [createMsg, setCreateMsg] = useState("");
  const [deleted, setDeleted] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const userName = JSON.parse(localStorage.getItem("user"));

  let navigate = useNavigate();
  useEffect(() => {
    setAmount(Math.round(weight * 15));
  }, [weight]);

  const createParcel = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://parcel-delivery.herokuapp.com/api/v1/parcels",
        {
          weight: Number(weight),
          price: Number(amount),
          destination: destination,
          pickupLocation: pickupLocation,
          receiver: recipient,
          receiverNumber: recipientNumber,
        },
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
      setRecipient("");
      setRecipientNumber("");
      setWeight("");
      setPickupLocation("");
      console.log(data);
    } catch (error) {
      if (
        error.response.data.msg ===
        "The string supplied did not seem to be a phone number"
      ) {
        setCreateMsg("please enter all input fields");
      } else if ((error.response.data.msg = "Invalid country calling code")) {
        setCreateMsg("complete all input fields");
      } else {
        setCreateMsg(error.response.data.msg);
      }
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
      const parcelData = data.parcel.parcel;
      const deliveredParcelsData = parcelData.filter(
        (parcel) => parcel.status === "delivered"
      );
      const notDeliveredParcelsData = parcelData.filter(
        (parcel) => parcel.status !== "delivered"
      );
      // console.log(deliveredParcelsData);
      // console.log(parcelData);
      setLoading(false);
      setParcels(parcelData);
      setDeliveredParcels(deliveredParcelsData);
      setNotDeliveredParcels(notDeliveredParcelsData);
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
            <div className="input-fields">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination...."
              />
            </div>
            <div className="input-fields">
              <label htmlFor="pickupLocation">Pickup Location</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="pickup location...."
              />
            </div>
            <div className="input-fields">
              <label htmlFor="recipient">Recipient Name</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="recipient name...."
              />
            </div>
            <div className="input-fields">
              <label htmlFor="recipientNumber">Recipient Number</label>
              <input
                type="tel"
                value={recipientNumber}
                onChange={(e) => setRecipientNumber(e.target.value)}
                placeholder="must start with +234"
              />
            </div>
            <div className="input-fields">
              <label htmlFor="parcelWeight">Parcel weight(Kg)</label>
              <input
                type="number"
                value={weight}
                min="0"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="weight in Kg"
              />
            </div>
            <div className="input-fields">
              <label htmlFor="amount">
                Amount<strong>(N)</strong>
              </label>
              <output type="text" onChange={(e) => setAmount(e.target.value)}>
                {Math.round(weight * 15)}
              </output>
            </div>
            <button type="submit" onClick={createParcel}>
              Create
            </button>
          </form>
        </div>
        <div className="user-parcels">
          <h2>User Parcels</h2>
          <h1>You have no Parcels</h1>
        </div>
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
            <div className="input-fields">
              <label htmlFor="destination">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination...."
              />
            </div>
            <div className="input-fields">
              <label htmlFor="pickupLocation">Pickup Location</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="pickup location...."
              />
            </div>
            <div className="input-fields">
              <label htmlFor="recipient">Recipient Name</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="recipient name...."
              />
            </div>
            <div className="input-fields">
              <label htmlFor="recipientNumber">Recipient Number</label>
              <input
                type="tel"
                value={recipientNumber}
                onChange={(e) => setRecipientNumber(e.target.value)}
                placeholder="must start with +234"
              />
            </div>
            <div className="input-fields">
              <label htmlFor="parcelWeight">Parcel weight(Kg)</label>
              <input
                type="number"
                value={weight}
                min="0.1"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="weight in Kg"
              />
            </div>
            <div className="input-fields">
              <label htmlFor="amount">
                Amount<strong>(N)</strong>
              </label>
              <output type="text">{Math.round(weight * 15)}</output>
            </div>
            <button type="submit" onClick={createParcel}>
              Create
            </button>
          </form>
        </div>
        <div className="user-parcels">
          <h2>User Parcels</h2>
          <div>
            {notDeliveredParcels.map((parcel) => {
              return (
                <UserParcel
                  key={parcel._id}
                  {...parcel}
                  getUserParcel={getUserParcel}
                  setLoading={setLoading}
                  setDeleted={setDeleted}
                  setDestination
                  setPickupLocation
                  setRecipient
                  setRecipientNumber
                  setWeight
                />
              );
            })}
          </div>
        </div>
        <div className="user-parcels">
          <h2>Delivered Parcels</h2>
          <div>
            {deliveredParcels.map((parcel) => {
              return (
                <Delivered
                  key={parcel._id}
                  {...parcel}
                  getUserParcel={getUserParcel}
                  setLoading={setLoading}
                  setDeleted={setDeleted}
                  setDestination
                  setPickupLocation
                  setRecipient
                  setRecipientNumber
                  setWeight
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
