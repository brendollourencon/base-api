const express = require("express");
const UserRouter = require("./UserRouter");

class Routes {
  constructor() {
    this.router = express.Router();
    this.userRouter = new UserRouter();
  }

  routes() {
    this.router.use("/user", this.userRouter.routes());

    return this.router;
  }
}

module.exports = Routes;
