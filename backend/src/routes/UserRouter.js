const express = require("express");
const JwtMiddleware = require("../middlewares/jwtMiddleware");
const UserController = require("../controllers/UserController");

class UserRouter {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
  }

  routes() {
    this.router.get("/", (req, res) =>
      this.controller.getAllUsers(req, res)
    );
    this.router.post("/", (req, res) => this.controller.create(req, res));
    this.router.post("/login", (req, res) => this.controller.verifyLogin(req, res));
    return this.router;
  }
}

module.exports = UserRouter;
