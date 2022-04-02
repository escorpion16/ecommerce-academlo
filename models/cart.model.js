const { DataTypes } = require('sequelize');
const { sequelize } = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING(10),
    defaultValue: 'active'
  }
});

modelu.exports = { Cart };
