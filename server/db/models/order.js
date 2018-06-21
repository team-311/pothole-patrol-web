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
  }
});

module.exports = Order
