/* eslint-disable */

// Import des packages
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Import context
import TokenContext from "../contexts/TokenContext";

function Card({ pokemon }) {
  const { userToken } = useContext(TokenContext);
  const [isCaught, setIsCaught] = useState(false);

  const getCaught = () => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/pokemons/caught/${pokemon.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsCaught(true);
        }
      })
      .catch(() => {
        setIsCaught(false);
      });
  };

  const addCaught = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/pokemons/caught`,
        {
          pokemonId: pokemon.id,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            text: "Congratulations ! You caught this Pokemon !",
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
        getCaught();
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          console.error(err);
          Swal.fire({
            icon: "error",
            text: "You must be logged in",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An error occured",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        }
      });
  };

  const removeCaught = () => {
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/pokemons/caught/${pokemon.id}`,
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
            text: "You released this Pokemon successfully !",
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
        getCaught();
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 401) {
          console.error(err);
          Swal.fire({
            icon: "error",
            text: "You must be logged in",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "An error occured",
            iconColor: "red",
            width: 300,
            confirmButtonColor: "black",
          });
        }
      });
  };

  const classType = (type) => {
    switch (type) {
      case "Normal":
        return "normal";
      case "Fire":
        return "fire";
      case "Water":
        return "water";
      case "Electric":
        return "electric";
      case "Grass":
        return "grass";
      case "Ice":
        return "ice";
      case "Fighting":
        return "fighting";
      case "Poison":
        return "poison";
      case "Ground":
        return "ground";
      case "Flying":
        return "flying";
      case "Psychic":
        return "psychic";
      case "Bug":
        return "bug";
      case "Rock":
        return "rock";
      case "Ghost":
        return "ghost";
      case "Dragon":
        return "dragon";
      case "Dark":
        return "dark";
      case "Steel":
        return "steel";
      case "Fairy":
        return "fairy";
      default:
        return null;
    }
  };

  useEffect(() => {
    getCaught();
  }, []);

  return (
    <div className="globalContainer card">
      <div className="firstRow">
        <div className="firstColumn">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`${pokemon.name}`}
          />
        </div>
        <hr className="hrCard" />
        <div className="lastColumn">
          <div className="header">
            <h2 className="pokemonName">
              #{pokemon.id} {pokemon.name}
            </h2>
            <div className="types">
              <p className={`type ${classType(pokemon.types[0].type.name)}`}>
                {pokemon.types[0].type.name}
              </p>
              {pokemon.types[1] ? (
                <p className={`type ${classType(pokemon.types[1].type.name)}`}>
                  {pokemon.types[1].type.name}
                </p>
              ) : null}
            </div>
          </div>
          <div className="stats">
            <p className="caracteristics">❤️: {pokemon.stats[0].base_stat}</p>
            <p className="caracteristics">⚔️: {pokemon.stats[1].base_stat}</p>
            <p className="caracteristics">🛡️: {pokemon.stats[2].base_stat}</p>
          </div>
        </div>
      </div>
      <div className="lastRow">
        {!isCaught ? (
          <button type="button" className="button" onClick={addCaught}>
            Catch this Pokemon !
          </button>
        ) : (
          <button
            type="button"
            className="button caughtButton"
            onClick={removeCaught}
          >
            You caught this Pokemon !
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
