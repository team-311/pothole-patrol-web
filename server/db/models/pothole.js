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
    defaultValue: 'Open'
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
}, {
  indexes: [
    {
      name: 'nearby_potholes',
      fields: ['status', 'latitude', 'longitude'],
      where: {
        status: 'Open'
      }
    }
  ]
});


module.exports = Pothole
