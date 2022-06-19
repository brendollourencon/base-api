const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.service = new UserService();
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const result = await this.service.login(email, password);
      return res.status(200).send(result);
    } catch (error) {
      res.status(500).send(`Houve um erro ao realizar login: ${error}`);
    }
  }

  async createUser(req, res) {
    try {
      const {id, email, name, phone, updatedAt, createdAt} = await this.service.createUser(req.body);
      return res.status(200).send({id, email, name, phone, updatedAt, createdAt});
    } catch (error) {
      if (error?.message === 'Este usuário já está cadastrado na base de dados') {
        return res.status(400).send(error.message);
      }
      res.status(500).send(`Houve um erro ao criar o usuário: ${error}`);
    }
  }
}

module.exports = UserController;
