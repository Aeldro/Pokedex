const AbstractManager = require("./AbstractManager");

class CaughtManager extends AbstractManager {
  constructor() {
    super({ table: "user_pokemon" });
  }

  insert(caught) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      caught.title,
    ]);
  }

  update(caught) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [caught.title, caught.id]
    );
  }

  findCaught(pokemonId, userId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE pokemon_id = ? AND user_id = ?`,
      [pokemonId, userId]
    );
  }

  insertCaught(pokemonId, userId) {
    return this.database.query(
      `insert into ${this.table} (pokemon_id, user_id) values (?, ?)`,
      [pokemonId, userId]
    );
  }

  deleteCaught(pokemonId, userId) {
    return this.database.query(
      `delete from ${this.table} where pokemon_id = ? AND user_id = ?`,
      [pokemonId, userId]
    );
  }

  findAllCaught(userId) {
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE user_id = ?`,
      [userId]
    );
  }
}

module.exports = CaughtManager;
