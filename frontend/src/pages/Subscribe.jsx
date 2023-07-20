// Import des packages
import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Import context
import TokenContext from "../contexts/TokenContext";

function Subscribe() {
  const { userToken } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            text: "Your account has been created",
            iconColor: "#ca2061",
            width: 300,
            confirmButtonColor: "black",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An error has occurred",
            iconColor: "#ca2061",
            width: 300,
            confirmButtonColor: "black",
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          Swal.fire({
            icon: "error",
            text: "This email is already registered",
            iconColor: "#ca2061",
            width: 300,
            confirmButtonColor: "black",
          });
        } else if (err.response.status === 400) {
          Swal.fire({
            icon: "error",
            text: "The password doesn't match",
            iconColor: "#ca2061",
            width: 300,
            confirmButtonColor: "black",
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            icon: "error",
            text: "An error has occurred (status 500)",
            iconColor: "#ca2061",
            width: 300,
            confirmButtonColor: "black",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An error has occurred",
            iconColor: "#ca2061",
            width: 300,
            confirmButtonColor: "black",
          });
        }
      });
  };

  return (
    <div>
      {!userToken ? (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <h1>Sign up</h1>
          <input
            type="text"
            className="textInput"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="textInput"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="textInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="textInput"
            placeholder="Password confirmation"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Sign up
          </button>
        </form>
      ) : (
        <div className="globalContainer">
          <h3 className="info">You are already logged in</h3>
        </div>
      )}
    </div>
  );
}

export default Subscribe;
