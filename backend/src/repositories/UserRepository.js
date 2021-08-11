const Repository = require("./Repository");
const UserModel = require("../models/UserModel");
const db = require("../../database");

class UserRepository extends Repository {
  constructor() {
    super(UserModel.init(db.sequelize));
  }
}

module.exports = UserRepository;
