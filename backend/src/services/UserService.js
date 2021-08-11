const bcrypt = require("bcrypt");
const UserRepository = require("../repositories/UserRepository");
const jsonwebtoken = require("jsonwebtoken");

class UserService {
  constructor() {
    this.repository = new UserRepository();
    this.bcrypt = bcrypt;
    this.salt = this.bcrypt.genSaltSync(10);
    this.jsonwebtoken = jsonwebtoken;
  }

  async create(user) {
    const userExist = await this.repository.exist({ email: user.email });
    if (userExist.count > 0) throw new Error("Este usuário já esta cadastrado na base de dados.");
    user.password = this.bcrypt.hashSync(user.password, this.salt);
    return this.repository.create(user);
  }

  async verifyLogin(user) {
    const userExist = await this.repository.findOneBy({ email: user.email });
    if (!userExist) throw new Error("Usuário inexistente.");
    const comparePassword = await this.bcrypt.compare(
      user.password,
      userExist.password
    );
    if (comparePassword) {
      return {
        name: userExist.name,
        email: userExist.email,
        token: this.jsonwebtoken.sign({ id: userExist.id }, process.env.SECRET, {
          expiresIn: "30m",
        })
      };
    }
    return null;
  }
}

module.exports = UserService;
