import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

function Landing() {
  if (JSON.parse(localStorage.getItem("token"))) {
    if (JSON.parse(localStorage.getItem("user")).role === "admin") {
      return <Navigate to="/admin" />;
    } else {
      return (
        <Navigate
          to={`/user/${JSON.parse(localStorage.getItem("user")).email}`}
        />
      );
    }
  }
  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Parcel Delivery App</h1>
        <div className="landing-text">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla id
            cum soluta cupiditate at voluptatibus fugit, distinctio consequatur,
            dicta molestiae optio. Itaque quae iste debitis ipsa, quo officia
            eligendi perferendis adipisci nobis odio voluptas eveniet
            consequuntur, iure totam tempore non aperiam! Atque ducimus veniam
            itaque nobis. Voluptatem, temporibus nam quidem ratione iure
            possimus, mollitia, eius nobis maxime reprehenderit nostrum
            voluptates repellat omnis. Repudiandae eius vel eveniet voluptatem
            vitae, dicta laboriosam! Eos pariatur repellat, quae magni eum vitae
            recusandae mollitia animi perferendis adipisci veniam delectus qui
            labore quia aut voluptatem? Esse doloremque expedita sed ex amet
            modi aspernatur quidem quod aut.
          </p>
        </div>
        <div className="btn-cont">
          <Link to="/login">
            <button className="landing-btn">Login/Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
