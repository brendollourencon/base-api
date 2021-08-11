const UserService = require("../services/UserService");
const UserRepository = require("../repositories/UserRepository");
const {userValidatorSchemaSave, userValidatorSchemaVerifyLogin} = require("../validators/userValidator");

class UserController {
  constructor() {
    this.service = new UserService();
    this.repository = new UserRepository();
  }

  async getAllUsers(req, res) {
    try {
      const getAll = await this.repository.all(["id", "name", "email"]);
      res.status(200).send(getAll);
    } catch (error) {
      res.status(500).send(`Houve um erro ao listar usuários: ${error}`);
    }
  }

  async create(req, res) {
    try {
      await userValidatorSchemaSave.validateAsync(req.body);
      const { name, email, password } = req.body;
      const result = await this.service.create({ name, email, password });
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(`Houve um erro ao cadastrar um novo usuário: ${error.message}`);
    }
  }

  async verifyLogin(req, res) {
    try {
      await userValidatorSchemaVerifyLogin.validateAsync(req.body);
      const tokenLogin = await this.service.verifyLogin(req.body);
      res.status(200).send(tokenLogin);
    } catch (error) {
      res.status(500).send(`Houve um erro ao autenticar o usuário: ${error}`);
    }
  }
}

module.exports = UserController;
