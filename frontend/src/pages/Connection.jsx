// Import des packages
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// Import context
import TokenContext from "../contexts/TokenContext";

function Connection() {
  const { userToken, setUserCookie } = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          navigate("/my-pokemons");
        } else {
          Swal.fire({
            icon: "error",
            text: "An error has occurred",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
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
            confirmButtonColor: "black",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An error has occurred",
            iconColor: "red",
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
        <div className="globalContainer">
          <h3 className="info">You are already logged in</h3>
        </div>
      )}
    </div>
  );
}

export default Connection;
