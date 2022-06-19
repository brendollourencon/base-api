const { Sequelize, DataTypes } = require("sequelize");

class UserModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.BIGINT,
          autoIncrement: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING(20),
        status: DataTypes.INTEGER,
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      },
      {
        sequelize,
        name: "UserModel",
        tableName: "users",
      }
    );
  }
}

module.exports = UserModel;
