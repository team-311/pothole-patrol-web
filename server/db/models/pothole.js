const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
  },
  location: {
    type: Sequelize.GEOMETRY('POINT')
  },
  priority: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('id') / 100
    }
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

// class methods
Pothole.findNearby = function (lat, lon, radius = process.env.NEARBY_POTHOLE_RADIUS) {
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`)
  const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('location'), location)

  return Pothole.findAll({
    attributes: ['id', 'priority', 'placement', 'latitude', 'longitude', 'streetAddress', 'status', 'serviceNumber', [distance, 'distance']],
    order: [[distance, 'ASC']],
    where: [{status: 'Open'}, Sequelize.where(distance, { [Op.lte]: radius })],
    limit: 25,
  })
}

Pothole.getNext = function (lat = '41.895266', lon = '-87.639035', radius = process.env.NEXT_POTHOLE_RADIUS) {
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`)
  const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('location'), location)

  return Pothole.findAll({
    attributes: ['id', 'priority', 'placement', 'latitude', 'longitude', 'streetAddress', 'status', 'serviceNumber', [distance, 'distance']],
    order: [[distance, 'ASC']],
    where: [{status: 'Open', reporterId: null}, Sequelize.where(distance, { [Op.lte]: radius })],
    limit: 25,
  })
    .then((potholes) => {
      const highestPriority = potholes.sort((a, b) => b.priority - a.priority)[0]
      return highestPriority
    })
}

Pothole.getClosest = function (lat = '41.895266', lon = '-87.639035') {
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`)
  const distance = Sequelize.fn('ST_Distance_Sphere', Sequelize.col('location'), location)

  return Pothole.findAll({
    attributes: ['id', 'priority', 'placement', 'latitude', 'longitude', 'status', 'streetAddress', 'serviceNumber', [distance, 'distance']],
    order: [[distance, 'ASC']],
    where: {
      status: 'Open',
      reporterId: null,
    },
    limit: 25,
  })
    .then((potholes) => {
      return potholes[0]
    })
}

module.exports = Pothole
