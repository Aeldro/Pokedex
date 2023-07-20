// Import des packages
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Import context
import TokenContext from "../contexts/TokenContext";

function Account() {
  const { userToken, setUserCookie } = useContext(TokenContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  const getInfos = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            text: "Your account has been updated",
            iconColor: "green",
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
      })
      .catch((err) => {
        if (err.response.status === 404) {
          Swal.fire({
            icon: "error",
            text: "Modification failed",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        } else if (err.response.status === 401) {
          Swal.fire({
            icon: "error",
            text: "You must be logged in",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            icon: "error",
            text: "An error has occurred (status 500)",
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((res) => {
            if (res.status === 204) {
              setUserCookie();
              Swal.fire({
                icon: "success",
                text: "Your account has been deleted",
                iconColor: "green",
                width: 300,
                confirmButtonColor: "black",
              });
              navigate("/");
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
            if (err.response.status === 404) {
              Swal.fire({
                icon: "error",
                text: "Delete failed",
                iconColor: "red",
                width: 300,
                confirmButtonColor: "black",
              });
            } else if (err.response.status === 401) {
              Swal.fire({
                icon: "error",
                text: "You must be logged in",
                iconColor: "red",
                width: 300,
                confirmButtonColor: "black",
              });
            } else if (err.response.status === 500) {
              Swal.fire({
                icon: "error",
                text: "An error has occurred (status 500)",
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
      }
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/user/password`,
        {
          password: oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "success",
            text: "The password has been updated",
            iconColor: "green",
            width: 300,
            confirmButtonColor: "black",
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          Swal.fire({
            icon: "error",
            text: "The password is incorrect",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        } else if (err.response.status === 400) {
          Swal.fire({
            icon: "error",
            text: "Both passwords must be the same",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        } else if (err.response.status === 500) {
          Swal.fire({
            icon: "error",
            text: "An error has occurred (status 500)",
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

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div>
      {userToken ? (
        <div className="formsContainer">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <h2>Modify my informations</h2>
            <input
              type="text"
              className="textInput"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="textInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="button">
              Modify
            </button>
          </form>
          <form onSubmit={handleChangePassword} className="form">
            <h2>Modify my password</h2>
            <div className="containerTextInput">
              <input
                type="password"
                placeholder="Previous password"
                name="ancienMdp"
                className="textInput"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="containerTextInput">
              <input
                type="password"
                placeholder="New password"
                name="nouveauMdp"
                className="textInput"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="containerTextInput">
              <input
                type="password"
                placeholder="Confirm password"
                name="newMdp"
                className="textInput"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="button">
              Modify password
            </button>
          </form>
          <button type="button" className="button" onClick={handleDelete}>
            Delete my account
          </button>
        </div>
      ) : (
        <div className="globalContainer">
          <h3 className="error">You must be logged in</h3>
        </div>
      )}
    </div>
  );
}

export default Account;
