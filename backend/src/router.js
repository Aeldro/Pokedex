const express = require("express");

const router = express.Router();

const {
  verifyEmailForSubscription,
  hashPassword,
  validatePassword,
  validateNewPassword,
  verifyPassword,
  verifyToken,
  login,
  hashNewPassword,
} = require("./services/auth");
const {
  add,
  getUserByEmail,
  getUserById,
  modifyUserById,
  removeUserById,
  getUserByIdMiddleware,
  modifyPasswordUser,
} = require("./controllers/userControllers");
const { getPokemonsList } = require("./controllers/pokemonControllers");
const {
  getCaught,
  addCaught,
  removeCaught,
  getCaughtList,
  fetchCaughtPokemons,
} = require("./controllers/caughtControllers");

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
router.post("/pokemons", getPokemonsList);
router.get("/pokemons/caught/:id", verifyToken, getCaught);
router.post("/pokemons/caught", verifyToken, addCaught);
router.delete("/pokemons/caught/:id", verifyToken, removeCaught);
router.get("/pokemons/caught", verifyToken, getCaughtList, fetchCaughtPokemons);

// User
router.get("/user", verifyToken, getUserById);
router.put("/user", verifyToken, modifyUserById);
router.delete("/user", verifyToken, removeUserById);
router.put(
  "/user/password",
  verifyToken,
  getUserByIdMiddleware,
  verifyPassword,
  validateNewPassword,
  hashNewPassword,
  modifyPasswordUser
);

module.exports = router;
