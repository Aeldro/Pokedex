/* eslint-disable */

const express = require("express");

const router = express.Router();

const {
  verifyEmailForSubscription,
  hashPassword,
  validatePassword,
  verifyPassword,
  verifyToken,
  login,
  hashNewPassword,
} = require("./services/auth");
const { add, getUserByEmail } = require("./controllers/userControllers");
const {
  getPokemonsList,
  getPreviousPokemonsList,
  getNextPokemonsList,
} = require("./controllers/pokemonControllers");

// Authentication
router.post(
  "/signup",
  verifyEmailForSubscription,
  validatePassword,
  hashPassword,
  add
);

router.post("/login", getUserByEmail, verifyPassword, login);

// Pokemons
router.get("/pokemons", getPokemonsList);
router.post("/pokemons/previous", getPreviousPokemonsList);
router.post("/pokemons/next", getNextPokemonsList);

module.exports = router;
