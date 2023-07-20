// Import des packages
import { useState, useContext, useEffect } from "react";
import axios from "axios";

// Import context
import TokenContext from "../contexts/TokenContext";

// Import des composants
import Card from "../components/Card";

// Import des images
import pokeball from "../assets/pokeball.png";
import error from "../assets/error.png";

function MyPokemons() {
  const { userToken } = useContext(TokenContext);
  const [pokemonsList, setPokemonsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const getCaughtPokemons = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/pokemons/caught`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        setPokemonsList(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setIsError(true);
        }
      });
  };

  useEffect(() => {
    getCaughtPokemons();
  }, []);

  useEffect(() => {
    if (isError) {
      setIsLoaded(true);
    }
  }, [isError, isLoaded]);

  return (
    <div>
      {userToken ? (
        <div>
          {isLoaded ? (
            <div className="cardsContainer">
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
              <img src={error} alt="Success icon" className="errorImg" />
              <h3 className="error">You caught no Pokemon</h3>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="globalContainer centeredContainer">
          <img src={error} alt="Error icon" className="errorImg" />
          <h3 className="error">You must be logged in</h3>
        </div>
      )}
    </div>
  );
}

export default MyPokemons;
