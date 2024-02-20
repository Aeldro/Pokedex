// Import des packages
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Import des composants
import Card from "../components/Card";
import PreviousNext from "../components/PreviousNext";

// Import des images
import pokeball from "../assets/pokeball.png";
import error from "../assets/error.png";

function Pokedex() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [search, setSearch] = useState("");

  const getPokemonsList = () => {
    setIsError(false);
    setIsLoaded(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/pokemons`, {
        currentPage,
      })
      .then((res) => {
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
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "red",
          width: 300,
          buttonsStyling: false,
          customClass: {
            confirmButton: "button",
          },
        });
      });
  };

  const getPreviousPokemonsList = () => {
    if (isPreviousAvailable) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPokemonsList = () => {
    if (isNextAvailable) {
      setCurrentPage(currentPage + 1);
    }
  };

  const searchPokemonsList = (e) => {
    e.preventDefault();
    if (search) {
      setIsError(false);
      setIsLoaded(false);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/pokemons/pokedex/${search}`)
        .then((res) => {
          setPokemonsList(res.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setIsError(true);
          console.error(err);
          Swal.fire({
            icon: "error",
            text: "Error retrieving data from api",
            iconColor: "red",
            width: 300,
            buttonsStyling: false,
            customClass: {
              confirmButton: "button",
            },
          });
        });
    } else {
      getPokemonsList();
    }
  };

  useEffect(() => {
    getPokemonsList();
  }, [currentPage]);

  useEffect(() => {
    if (isError) {
      setIsLoaded(true);
    }
  }, [isError, isLoaded]);

  return (
    <div>
      {isLoaded ? (
        <div className="cardsContainer">
          <form onSubmit={(e) => searchPokemonsList(e)}>
            <input
              type="text"
              className="textInput"
              placeholder="Search a Pokemon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="button">
              Search
            </button>
          </form>
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
        <div className="globalContainer centeredContainer">
          <img
            src={pokeball}
            className="spinningPokeball"
            alt="Spinning pokeball"
          />
          <h3 className="info">Loading...</h3>
        </div>
      )}
      {isError ? (
        <div className="globalContainer centeredContainer">
          <img src={error} alt="Error icon" className="errorImg" />
          <h3 className="error">Loading has failed</h3>
        </div>
      ) : null}
    </div>
  );
}

export default Pokedex;
