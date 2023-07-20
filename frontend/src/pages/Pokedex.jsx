// Import des packages
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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
  const [search, setSearch] = useState("");

  const getPokemonsList = () => {
    setIsError(false);
    setIsLoaded(false);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pokemons`)
      .then((res) => {
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
        console.error(err);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "red",
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
        console.error(err);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "red",
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
        console.error(err);
        Swal.fire({
          icon: "error",
          text: "Error retrieving data from api",
          iconColor: "red",
          width: 300,
          confirmButtonColor: "black",
        });
      });
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
            confirmButtonColor: "black",
          });
        });
    } else {
      getPokemonsList();
    }
  };

  useEffect(() => {
    getPokemonsList();
  }, []);

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
              placeholder="Search a Pokemon"
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
