"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Student",
          "name",
          {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Student",
          "age",
          {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Student", "name", { transaction: t }),
        queryInterface.removeColumn("Student", "age", { transaction: t }),
      ]);
    });
  },
};
