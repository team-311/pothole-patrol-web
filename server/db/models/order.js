const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Requested', 'In Progress', 'Completed')
  },
  dateCompleted: {
    type: Sequelize.DATE
  },
  googleRoute: {
    type: Sequelize.STRING
  },
  contactNumber: {
    type: Sequelize.STRING,
    defaultValue: '555-123-5432'
  },
});

module.exports = Order
