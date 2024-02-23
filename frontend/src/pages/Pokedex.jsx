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
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [isNextAvailable, setIsNextAvailable] = useState(true);
  const [isPreviousAvailable, setIsPreviousAvailable] = useState(false);
  const [search, setSearch] = useState("");
  const [searchingByName, setSearchingByName] = useState(false);
  const [startFetching, setStartFetching] = useState(0);

  const getPokemonsList = () => {
    setIsError(false);
    setIsLoaded(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/pokemons`, {
        currentPage,
        pageLimit,
        searchingByName,
        search,
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
        setNumberOfPages(res.data.numberOfPages);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsError(true);
        console.error(err);
        Swal.fire({
          icon: "error",
          text: err.response.data,
          iconColor: "red",
          width: 300,
          buttonsStyling: false,
          customClass: {
            confirmButton: "button",
          },
        });
      });
  };

  useEffect(() => {
    getPokemonsList();
  }, [startFetching]);

  useEffect(() => {
    if (isError) {
      setIsLoaded(true);
    }
  }, [isError, isLoaded]);

  return (
    <div>
      {isLoaded ? (
        <div className="cardsContainer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              if (search) {
                setSearchingByName(true);
              } else {
                setSearchingByName(false);
              }
              setStartFetching(startFetching + 1);
            }}
          >
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
          <input
            type="number"
            className="textInput"
            placeholder="Limit per page..."
            value={pageLimit}
            onChange={(e) => setPageLimit(e.target.value)}
          />
          <PreviousNext
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            numberOfPages={numberOfPages}
            isNextAvailable={isNextAvailable}
            isPreviousAvailable={isPreviousAvailable}
            startFetching={startFetching}
            setStartFetching={setStartFetching}
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
