const Enum = require("enum");
Enum.register();

const UserStatusEnum = new Enum({
  INACTIVE: {
    id: 0,
    name: "Inativo",
  },
  ACTIVE: {
    id: 1,
    name: "Ativo",
  },
});

module.exports = UserStatusEnum;
