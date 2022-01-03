import React from "react";
import { useEffect } from "react";
function Navbar() {
  const token = JSON.parse(localStorage.getItem("token"));

  return (
    <div>
      <div className="heading">
        <h1>Parcel delivery</h1>
      </div>
    </div>
  );
}

export default Navbar;
