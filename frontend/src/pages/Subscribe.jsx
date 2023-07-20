// Import des packages
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// Import context
import TokenContext from "../contexts/TokenContext";

// Import des images
import success from "../assets/success.png";

function Subscribe() {
  const { userToken } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

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
            iconColor: "green",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
          navigate("/");
        } else {
          Swal.fire({
            icon: "error",
            text: "An error has occurred",
            iconColor: "red",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 403) {
          Swal.fire({
            icon: "error",
            text: "This email is already registered",
            iconColor: "red",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
        } else if (err.response.status === 400) {
          Swal.fire({
            icon: "error",
            text: "The password doesn't match",
            iconColor: "red",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            icon: "error",
            text: "An error has occurred (status 500)",
            iconColor: "red",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An error has occurred",
            iconColor: "red",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
        }
      });
  };

  return (
    <div>
      {!userToken ? (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="form  centeredContainer"
        >
          <h1>Sign up</h1>
          <input
            type="text"
            className="textInput"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="textInput"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="textInput"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="textInput"
            placeholder="Password confirmation"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Sign up
          </button>
        </form>
      ) : (
        <div className="globalContainer centeredContainer">
          <img src={success} alt="Success icon" className="successImg" />
          <h3 className="info">You are logged in</h3>
        </div>
      )}
    </div>
  );
}

export default Subscribe;
