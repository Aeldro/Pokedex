/* eslint-disable */

// Import des packages
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Import context
import TokenContext from "../contexts/TokenContext";

// Import des composants
import Card from "../components/Card";
import PreviousNext from "../components/PreviousNext";

function Pokedex() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);

  const getPokemonsList = (e) => {
    setIsError(false);
    setIsLoaded(false);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pokemons`)
      .then((res) => {
        console.log(res.data);
        if (res.data.next) {
          setIsNextAvailable(true);
        }
        if (res.data.previous) {
          setIsPreviousAvailable(true);
        }
        setPokemonsList(res.data.pokemonsList);
        setCurrentPage(res.data.newPage);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsError(true);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "#ca2061",
          width: 300,
          confirmButtonColor: "black",
        });
      });
  };

  const getPreviousPokemonsList = () => {
    setIsError(false);
    setIsLoaded(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/pokemons/previous`, {
        currentPage,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.next) {
          setIsNextAvailable(true);
        } else {
          setIsNextAvailable(false);
        }
        if (res.data.previous) {
          setIsPreviousAvailable(true);
        } else {
          setIsPreviousAvailable(false);
        }
        setPokemonsList(res.data.pokemonsList);
        setCurrentPage(res.data.newPage);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsError(true);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "#ca2061",
          width: 300,
          confirmButtonColor: "black",
        });
      });
  };

  const getNextPokemonsList = () => {
    setIsError(false);
    setIsLoaded(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/pokemons/next`, {
        currentPage,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.next) {
          setIsNextAvailable(true);
        } else {
          setIsNextAvailable(false);
        }
        if (res.data.previous) {
          setIsPreviousAvailable(true);
        } else {
          setIsPreviousAvailable(false);
        }
        setPokemonsList(res.data.pokemonsList);
        setCurrentPage(res.data.newPage);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsError(true);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "#ca2061",
          width: 300,
          confirmButtonColor: "black",
        });
      });
  };

  useEffect(() => {
    getPokemonsList();
  }, []);
  useEffect(() => {
    console.log(pokemonsList);
  }, [pokemonsList]);

  return (
    <div>
      {isLoaded ? (
        <div className="cardsContainer">
          <PreviousNext
            isNextAvailable={isNextAvailable}
            isPreviousAvailable={isPreviousAvailable}
            getPreviousPokemonsList={getPreviousPokemonsList}
            getNextPokemonsList={getNextPokemonsList}
          />
          {pokemonsList.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="globalContainer">
          <h3 className="info">Loading...</h3>
        </div>
      )}
      {isError ? (
        <div className="globalContainer">
          <h3 className="error"> Loading has failed</h3>
        </div>
      ) : null}
    </div>
  );
}

export default Pokedex;
