/* eslint-disable */

// Import des packages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import du style
import "./reset.css";
import "./App.css";
import "./components/NavBar.css";
import "./components/Card.css";
import "./components/PreviousNext.css";
import "./pages/Connection.css";
import "./pages/Subscribe.css";
import "./pages/Account.css";
import "./pages/Pokedex.css";
import "./pages/MyPokemons.css";

// Import des pages
import Connection from "./pages/Connection";
import Subscribe from "./pages/Subscribe";
import Account from "./pages/Account";
import Pokedex from "./pages/Pokedex";
import MyPokemons from "./pages/MyPokemons";

// Import des composants
import NavBar from "./components/NavBar";
import Card from "./components/Card";

// Import des contexts
import { MenuContextProvider } from "./contexts/MenuContext";
import { TokenContextProvider } from "./contexts/TokenContext";

function App() {
  return (
    <div className="App">
      <MenuContextProvider>
        <TokenContextProvider>
          <Router>
            <NavBar />
            <Routes>
              <Route path="" element={<Connection />} />
              <Route path="subscribe" element={<Subscribe />} />
              <Route path="account" element={<Account />} />
              <Route path="pokedex" element={<Pokedex />} />
              <Route path="my-pokemons" element={<MyPokemons />} />
            </Routes>
          </Router>
        </TokenContextProvider>
      </MenuContextProvider>
    </div>
  );
}

export default App;
