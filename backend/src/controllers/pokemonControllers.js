/* eslint-disable */
const axios = require("axios");
const models = require("../models");
require("dotenv").config();

const getPokemonsListWithoutFilter = async (req, res) => {
  const currentPage = req.body.currentPage;
  const limit = req.body.pageLimit;
  const pokemonsList = [];
  try {
    const result = await axios.get(
      `${process.env.API_URL}?offset=${
        limit * currentPage - limit
      }&limit=${limit}`
    );
    const numberOfPages = Math.ceil(result.data.count / limit);

    for (let i = 0; i < result.data.results.length; i += 1) {
      try {
        const pokemon = await axios.get(result.data.results[i].url);
        pokemonsList.push(pokemon.data);
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error retrieving data from api");
      }
    }
    const data = {
      pokemonsList,
      numberOfPages,
    };
    if (result.data.previous) {
      data.previous = true;
    } else {
      data.previous = false;
    }
    if (result.data.next) {
      data.next = true;
    } else {
      data.next = false;
    }

    // Set the first character of the name in uppercase
    for (let i = 0; i < data.pokemonsList.length; i += 1) {
      data.pokemonsList[i].name =
        data.pokemonsList[i].name[0].toUpperCase() +
        data.pokemonsList[i].name.slice(1);
    }

    // Set the first character of the types in uppercase
    for (let i = 0; i < data.pokemonsList.length; i += 1) {
      data.pokemonsList[i].types[0].type.name =
        data.pokemonsList[i].types[0].type.name[0].toUpperCase() +
        data.pokemonsList[i].types[0].type.name.slice(1);
      if (data.pokemonsList[i].types[1]) {
        data.pokemonsList[i].types[1].type.name =
          data.pokemonsList[i].types[1].type.name[0].toUpperCase() +
          data.pokemonsList[i].types[1].type.name.slice(1);
      }
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from api");
  }
};

const getPokemonsListWithNameFilter = async (req, res) => {
  const currentPage = req.body.currentPage;
  const limit = req.body.pageLimit;
  const searchString = req.body.search;
  const pokemonsList = [];
  try {
    const result = await axios.get(`${process.env.API_URL}`);
    const count = result.data.count;
    const dataResult = await axios.get(`${process.env.API_URL}?limit=${count}`);
    const filteredData = dataResult.data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchString.toLowerCase())
    );
    const limitedFilteredData = filteredData.slice(limit * currentPage - limit, limit * currentPage);
    for (let i = 0; i < limitedFilteredData.length; i += 1) {
      try {
        const pokemon = await axios.get(limitedFilteredData[i].url);
        pokemonsList.push(pokemon.data);
      } catch (err) {
        console.error(err);
        return res.status(500).send("Error retrieving data from api");
      }
    }
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
    const numberOfPages = Math.ceil(filteredData.length / limit);
    const data = {
      pokemonsList,
      numberOfPages,
    };
    if (currentPage > 1) {
      data.previous = true;
    } else {
      data.previous = false;
    }
    if (currentPage < numberOfPages) {
      data.next = true;
    } else {
      data.next = false;
    }
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from api");
  }
};

const getPokemonsList = (req, res) => {
  const searchingByName = req.body.searchingByName;
  if (searchingByName) {
    getPokemonsListWithNameFilter(req, res);
  } else {
    getPokemonsListWithoutFilter(req, res);
  }
};

module.exports = {
  getPokemonsList,
};
