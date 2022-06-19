const {UserModel} = require("../../database");

class UserRepository {
  constructor() {
    this.model = UserModel;
  }
}

module.exports = UserRepository;
