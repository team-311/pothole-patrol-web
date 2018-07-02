const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../db');
const Crew = require('./crew');
const Order = require('./order');

const Pothole = db.define(
  'pothole',
  {
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'https://s3.us-east-2.amazonaws.com/soundandcolor/(no+image+available)+(2).png'
    },
    description: {
      type: Sequelize.TEXT,
    },
    placement: {
      type: Sequelize.ENUM(
        'Bike Lane',
        'Crosswalk',
        'Curb Lane',
        'Intersection',
        'Traffic Lane'
      ),
    },
    completionDate: {
      type: Sequelize.DATE,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: 'Open',
    },
    serviceNumber: {
      type: Sequelize.STRING,
    },
    ward: {
      type: Sequelize.INTEGER,
    },
    latitude: {
      type: Sequelize.DECIMAL(18, 15),
    },
    longitude: {
      type: Sequelize.DECIMAL(18, 15),
    },
    mostRecentAction: {
      type: Sequelize.STRING,
    },
    subscribed: {
      type: Sequelize.BOOLEAN,
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
      type: Sequelize.GEOMETRY('POINT'),
    },
    upVotes: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    priority: {
      type: Sequelize.VIRTUAL,
      get() {
        let todaysDate = new Date().getTime();
        let potholeCreatedDate = this.getDataValue('createdAt');
        let status = this.getDataValue('status');

        const dateDifference = (today, prevDate) =>
          ((today - prevDate) / (1000 * 60 * 60 * 24)) * 10;

        if (potholeCreatedDate) {
          if (status === 'Open') {
            return (
              dateDifference(todaysDate, potholeCreatedDate.getTime()) /
              this.upVotes
            );
          } else {
            return 0;
          }
        }
      },
    },
  },
  {
    indexes: [
      {
        name: 'nearby_potholes',
        fields: ['status', 'latitude', 'longitude'],
        where: {
          status: 'Open',
        },
      },
    ],
  }
);

// class methods
Pothole.findNearby = function(
  lat,
  lon,
  radius = process.env.NEARBY_POTHOLE_RADIUS
) {
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`);
  const distance = Sequelize.fn(
    'ST_Distance_Sphere',
    Sequelize.col('location'),
    location
  );

  return this.findAll({
    attributes: [
      'id',
      'priority',
      'placement',
      'latitude',
      'longitude',
      'streetAddress',
      'status',
      'serviceNumber',
      [distance, 'distance'],
    ],
    order: [[distance, 'ASC']],
    where: [
      { status: 'Open' },
      Sequelize.where(distance, { [Op.lte]: radius }),
    ],
    limit: 25,
  });
};

Pothole.getNext = function(
  lat = '41.895266',
  lon = '-87.639035',
  radius = process.env.NEXT_POTHOLE_RADIUS
) {
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`);
  const distance = Sequelize.fn(
    'ST_Distance_Sphere',
    Sequelize.col('location'),
    location
  );

  return this.findAll({
    attributes: [
      'id',
      'priority',
      'placement',
      'latitude',
      'longitude',
      'streetAddress',
      'status',
      'serviceNumber',
      'completionDate',
      [distance, 'distance'],
    ],
    order: [[distance, 'ASC']],
    where: [
      { status: 'Open', orderId: null },
      Sequelize.where(distance, { [Op.lte]: radius }),
    ],
    limit: 25,
  }).then(potholes => {
    const highestPriority = potholes.sort((a, b) => b.priority - a.priority)[0];
    return highestPriority;
  });
};

Pothole.getClosest = function(lat = '41.895266', lon = '-87.639035') {
  const location = Sequelize.literal(`ST_GeomFromText('POINT(${lon} ${lat})')`);
  const distance = Sequelize.fn(
    'ST_Distance_Sphere',
    Sequelize.col('location'),
    location
  );

  return this.findAll({
    attributes: [
      'id',
      'priority',
      'placement',
      'latitude',
      'longitude',
      'status',
      'streetAddress',
      'serviceNumber',
      'completionDate',
      [distance, 'distance'],
    ],
    order: [[distance, 'ASC']],
    where: {
      status: 'Open',
      orderId: null,
    },
    limit: 25,
  }).then(potholes => {
    return potholes[0];
  });
};

Pothole.createOrders = async function() {
  const crews = await Crew.findAll();

  let nextPotholes = await Pothole.findAll({
    attributes: [
      'id',
      'priority',
      'placement',
      'latitude',
      'longitude',
      'streetAddress',
      'status',
      'serviceNumber',
      'completionDate',
    ],
    where: [{ status: 'Open', orderId: null }],
    limit: 500,
  });

  nextPotholes = nextPotholes.sort((a, b) => b.priority - a.priority);
  for (let i = 0; i < crews.length; i++) {
    const order = await Order.create({
      status: 'Requested',
      crewId: crews[i].id,
      userId: 1,
    });
    await nextPotholes[i].setOrder(order);
    nextPotholes[i].save();
  }
};

// instance method
Pothole.prototype.incrementUpvotes = function() {
  return this.increment(['upVotes'], { by: 1 });
};

module.exports = Pothole;
