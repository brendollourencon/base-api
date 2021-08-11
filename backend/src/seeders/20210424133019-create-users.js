"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "Brendol L.",
        email: "brendol.lourencon@gmail.com",
        password: bcrypt.hashSync("123", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John",
        email: "example@example.com",
        password: bcrypt.hashSync("123", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 2",
        email: "user2@example.com",
        password: bcrypt.hashSync("123", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User 3",
        email: "user3@example.com",
        password: bcrypt.hashSync("123", bcrypt.genSaltSync(10)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
