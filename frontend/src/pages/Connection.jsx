// Import des packages
import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Import context
import TokenContext from "../contexts/TokenContext";

// Import des images
import success from "../assets/success.png";

function Connection() {
  const { userToken, setUserCookie } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUserCookie(res.data.token);
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
        if (err.response.status === 401) {
          Swal.fire({
            icon: "error",
            text: "The email or password is incorrect",
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
          className="form centeredContainer"
        >
          <h1>Login</h1>
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
          <button type="submit" className="button">
            Login
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

export default Connection;
