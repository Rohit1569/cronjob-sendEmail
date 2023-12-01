'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contactdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contactdetail.init({
    typeOfContactDetail: DataTypes.STRING,
    valueOfContactDetail: DataTypes.STRING,
    userId: DataTypes.UUID,
    contactId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'contactdetail',
    underscored: true,
    paranoid: true
  });
  return contactdetail;
};