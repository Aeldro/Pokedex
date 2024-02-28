/* eslint-disable */

// Import des packages
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

// Import des images
import error from "../assets/error.png";

function Error({ message }) {
  return (
    <div className="globalContainer centeredContainer">
      <img src={error} alt="Error icon" className="errorImg" />
      <h3 className="error">{message}</h3>
    </div>
  );
}

export default Error;
