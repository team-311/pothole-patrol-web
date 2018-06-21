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
    type: Sequelize.STRING,
  },
  serviceNumber: {
    type: Sequelize.STRING
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
  },
  streetAddress: {
    type: Sequelize.STRING,
  },
  zip: {
    type: Sequelize.STRING(5),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()'),
  }
});


module.exports = Pothole
