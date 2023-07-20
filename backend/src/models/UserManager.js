const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert({ name, email, hashedPassword }) {
    return this.database.query(
      `insert into ${this.table} (name, email, hashed_password) values (?, ?, ?)`,
      [name, email, hashedPassword]
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [user.title, user.id]
    );
  }

  findUserByEmail(email) {
    return this.database.query(`select * from ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  updateUser(id, name, email) {
    return this.database.query(
      `update ${this.table} set name = ?, email = ? where id = ?`,
      [name, email, id]
    );
  }

  updatePassword(id, hashedPassword) {
    return this.database.query(
      `update ${this.table} set hashed_password = ? where id = ?`,
      [hashedPassword, id]
    );
  }
}

module.exports = UserManager;
