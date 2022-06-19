const express = require("express");
const UserController = require("../controllers/UserController");
const UserValidator = require('../middlewares/validators/UserValidator');

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
    this.validator = new UserValidator();
  }

  routes() {
    this.router.post("/",
      (req, res, next) => this.validator.create(req, res, next),
              (req, res) => this.controller.createUser(req, res)
    );

    this.router.post("/auth",
      (req, res, next) => this.validator.login(req, res, next),
              (req, res) => this.controller.login(req, res)
    );

    return this.router;
  }
}

module.exports = UserRouter;
