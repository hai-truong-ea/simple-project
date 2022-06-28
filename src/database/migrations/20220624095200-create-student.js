
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable("Student", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      className: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      classRoomID: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "ClassRoom",
          key: "id",
        },
      },
      info: {
        type: Sequelize.DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable("Student");
  },
};
