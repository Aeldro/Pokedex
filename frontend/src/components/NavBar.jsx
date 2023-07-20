// Import des packages
import { useContext } from "react";
import { Link } from "react-router-dom";

// Import des images
import pokeball from "../assets/pokeball.png";
import cross from "../assets/cross.svg";

// Import des contexts
import MenuContext from "../contexts/MenuContext";
import TokenContext from "../contexts/TokenContext";

function NavBar() {
  const { isMenuShow, setIsMenuShow } = useContext(MenuContext);
  const { userToken, setUserCookie } = useContext(TokenContext);
  return (
    <nav className="nav">
      <div className="logo">
        <img src={pokeball} alt="Pokeball logo" className="logoImg" />
      </div>
      <button
        type="button"
        className="burger"
        onClick={() => setIsMenuShow(true)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`menu ${isMenuShow ? "showMenu" : null}`}>
        <div className="crossSection">
          <button type="button" onClick={() => setIsMenuShow(false)}>
            <img src={cross} alt="Croix de fermeture du menu" />
          </button>
        </div>

        {userToken ? (
          <div className="navButtonsContainer">
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setIsMenuShow(false);
                setUserCookie();
              }}
            >
              <Link to="/">
                <p>&nbsp;Logout</p>
              </Link>
            </button>

            <button
              type="button"
              className="navLink"
              onClick={() => setIsMenuShow(false)}
            >
              <Link to="/account">Account</Link>
            </button>

            <button
              type="button"
              className="navLink"
              onClick={() => setIsMenuShow(false)}
            >
              <Link to="/my-pokemons">My Pokemons</Link>
            </button>

            <button
              type="button"
              className="navLink"
              onClick={() => setIsMenuShow(false)}
            >
              <Link to="/pokedex">Pokedex</Link>
            </button>
          </div>
        ) : (
          <div className="navButtonsContainer">
            <button
              type="button"
              className="navLink"
              onClick={() => {
                setIsMenuShow(false);
              }}
            >
              <Link to="/">
                <p>Login</p>
              </Link>
            </button>

            <button
              type="button"
              className="navLink"
              onClick={() => setIsMenuShow(false)}
            >
              <Link to="/subscribe">Sign up</Link>
            </button>

            <button
              type="button"
              className="navLink"
              onClick={() => setIsMenuShow(false)}
            >
              <Link to="/pokedex">Pokedex</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
