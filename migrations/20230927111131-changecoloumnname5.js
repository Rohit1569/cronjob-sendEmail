'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('contacts', 'firstName', 'first_name')
    await queryInterface.renameColumn('contacts', 'lastName', 'last_name')
    await queryInterface.renameColumn('contacts', 'userId', 'user_id')
    await queryInterface.renameColumn('contacts', 'updatedAt', 'updated_at')
    await queryInterface.renameColumn('contacts', 'deletedAt', 'deleted_at')
    await queryInterface.renameColumn('contacts', 'createdAt', 'created_at')

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
