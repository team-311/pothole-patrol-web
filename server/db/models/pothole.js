const Sequelize = require('sequelize')
const db = require('../db')

const Pothole = db.define('pothole', {
  imageUrl: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  placement: {
    type: Sequelize.ENUM('Bike Lane', 'Crosswalk', 'Curb Lane', 'Intersection', 'Traffic Lane')
  },
  completionDate: {
    type: Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('Requested', 'Approved', 'In Progress', 'Completed')
  },
  serviceNumber: {
    type: Sequelize.INTEGER
  },
  ward: {
    type: Sequelize.INTEGER
  },
  latitude: {
    type: Sequelize.DECIMAL(18, 15)
  },
  longitude: {
    type: Sequelize.DECIMAL(18, 15)
  },
  mostRecentAction: {
    type: Sequelize.STRING
  },
  subscribed: {
    type: Sequelize.BOOLEAN
  }
});


module.exports = Pothole
