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
    // await queryInterface.renameColumn('contactdetails', 'typeOfContactDetail', 'type_of_contact_detail')
    // await queryInterface.renameColumn('contactdetails', 'valueOfContactDetail', 'value_of_contact_detail')
    // await queryInterface.renameColumn('contactdetails', 'createdAt', 'created_at')
    // await queryInterface.renameColumn('contactdetails', 'updatedAt', 'updated_at')
    await queryInterface.renameColumn('contactdetails', 'deletedAt', 'deleted_at')
    // await queryInterface.renameColumn('contactdetails', 'userId', 'user_id')
    // await queryInterface.renameColumn('contactdetails', 'contactId', 'contact_id')

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
