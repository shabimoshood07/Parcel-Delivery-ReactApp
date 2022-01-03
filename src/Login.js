import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Login() {
  const { userEmail } = useParams();

  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  const registerPage = () => {
    setRegister(true);
  };

  const loginPage = () => {
    setRegister(false);
  };

  // SIGNUP FUNCTION

  const signup = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const user = await axios.post(
        "https://parcel-delivery.herokuapp.com/api/v1/auth/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      setErrorMsg("User Created Successfully");
      console.log(user);
    } catch (error) {
      setErrorMsg(error.response.data.msg);
      console.log(error.response.data);
    }
    setEmail("");
    setName("");
    setPassword("");
    setLoading(false);
  };

  // LOGIN FUNCTION
  const loginFunc = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://parcel-delivery.herokuapp.com/api/v1/auth/login",
        {
          email: email,
          password: password,
        }
      );
      setErrorMsg("Login Successful");
      console.log(data.user.role);
      const role = data.user.role;
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      setLoading(false);
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate(`/user/${data.user.email}`);
      }
    } catch (error) {
      setErrorMsg(error.response.data.msg);
      console.log(error.response.data.msg);
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  if (register) {
    return (
      <div className="login-container">
        <h1 className="login-title">Signup</h1>
        <div className="underline"></div>
        <p className="error-msg">{errorMsg}</p>

        <form className="login">
          <label htmlFor="Name">Name</label>
          <input
            type="Name"
            placeholder="Name...."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email...."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            placeholder="password...."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="login-btn" onClick={signup}>
            {loading ? "Loading..." : "Signup"}
          </button>
        </form>
        <p>
          Are you registered?
          <button type="button" className="switch-btn" onClick={loginPage}>
            Login
          </button>
        </p>
      </div>
    );
  }
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="underline"></div>
      <p className="error-msg">{errorMsg}</p>

      <form className="login">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email...."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          placeholder="password...."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit" className="login-btn" onClick={loginFunc}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <p>
        Are you registered?
        <button className="switch-btn" onClick={registerPage}>
          Signup
        </button>
      </p>
    </div>
  );
}

export default Login;
