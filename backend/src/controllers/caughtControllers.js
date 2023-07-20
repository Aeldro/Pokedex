const axios = require("axios");

const models = require("../models");

const getCaught = (req, res) => {
  const pokemonId = req.params.id;
  const userId = req.payload.sub;
  models.caught
    .findCaught(pokemonId, userId)
    .then(([caught]) => {
      if (caught.length) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addCaught = (req, res) => {
  const { pokemonId } = req.body;
  const userId = req.payload.sub;
  models.caught
    .insertCaught(pokemonId, userId)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const removeCaught = (req, res) => {
  const pokemonId = req.params.id;
  const userId = req.payload.sub;
  models.caught
    .deleteCaught(pokemonId, userId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getCaughtList = (req, res, next) => {
  const userId = req.payload.sub;
  models.caught.findAllCaught(userId).then(([caught]) => {
    if (caught.length) {
      req.body.caughtList = caught;
      next();
    } else {
      res.sendStatus(404);
    }
  });
};

const fetchCaughtPokemons = (req, res) => {
  const pokemonsList = [];
  const promises = [];

  for (let i = 0; i < req.body.caughtList.length; i += 1) {
    const pokemonId = req.body.caughtList[i].pokemon_id;
    const promise = axios
      .get(`${process.env.API_URL}/${pokemonId}`)
      .then((response) => {
        pokemonsList.push(response.data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from api");
      });

    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    pokemonsList.sort((a, b) => {
      return a.id - b.id;
    });
    for (let i = 0; i < pokemonsList.length; i += 1) {
      pokemonsList[i].name =
        pokemonsList[i].name[0].toUpperCase() + pokemonsList[i].name.slice(1);
    }
    for (let i = 0; i < pokemonsList.length; i += 1) {
      pokemonsList[i].types[0].type.name =
        pokemonsList[i].types[0].type.name[0].toUpperCase() +
        pokemonsList[i].types[0].type.name.slice(1);
      if (pokemonsList[i].types[1]) {
        pokemonsList[i].types[1].type.name =
          pokemonsList[i].types[1].type.name[0].toUpperCase() +
          pokemonsList[i].types[1].type.name.slice(1);
      }
    }
    res.send(pokemonsList);
  });
};

module.exports = {
  getCaught,
  addCaught,
  removeCaught,
  getCaughtList,
  fetchCaughtPokemons,
};
