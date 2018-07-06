'use strict';

const db = require('../server/db');
const { User, Pothole, Crew, Order } = require('../server/db/models');
const { potholes } = require('../script/potholes_2018.json');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const crew = await Promise.all([
    Crew.create({ name: 'The Logan Squares', contactNumber: '9999999999' }),
    Crew.create({ name: 'The Wicker Parkas', contactNumber: '9999999998' }),
    Crew.create({ name: 'The Lakeview Lads', contactNumber: '9999999997' }),
    Crew.create({ name: 'The Boys Town Ballers', contactNumber: '9999999996' }),
    Crew.create({ name: 'The Lincoln Layers', contactNumber: '9999999995' }),
  ]);

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Murphy',
      type: 'admin',
      email: 'cody@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Gary',
      lastName: 'McMahon',
      type: 'admin',
      email: 'murphy@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'George',
      lastName: 'Washington',
      type: 'admin',
      email: 'george@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Alexander',
      lastName: 'Hamilton',
      type: 'crew',
      email: 'alexander@email.com',
      password: '123',
      crewId: 2,
    }),
    User.create({
      firstName: 'Aaron',
      lastName: 'Burr',
      type: 'crew',
      email: 'aaron@email.com',
      password: '123',
      crewId: 1,
    }),
    User.create({
      firstName: 'Eliza',
      lastName: 'Schuyler',
      type: 'admin',
      email: 'eliza@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Peggy',
      lastName: 'Schuyler',
      type: 'admin',
      email: 'peggy@email.com',
      password: '123',
    }),
  ]);

  const orderData = [
    { status: 'Completed', userId: 1, crewId: 1, dateCompleted: moment().day(-7) },
    { status: 'Completed', userId: 2, crewId: 2, dateCompleted: moment().day(-10) },
    { status: 'Completed', userId: 2, crewId: 2, dateCompleted: moment().day(-12) },
    { status: 'Completed', userId: 3, crewId: 2, dateCompleted: moment().day(-15) },
    { status: 'Completed', userId: 4, crewId: 3, dateCompleted: moment().day(-20) },
    { status: 'Completed', userId: 4, crewId: 4, dateCompleted: moment().day(-25) },
    { status: 'Completed', userId: 4, crewId: 4, dateCompleted: moment().day(-30) },
    { status: 'Completed', userId: 4, crewId: 5, dateCompleted: moment().day(-33) },
    { status: 'Completed', userId: 5, crewId: 2, dateCompleted: moment().day(-40) },
    { status: 'Completed', userId: 6, crewId: 5, dateCompleted: moment().day(-42) },
    { status: 'Completed', userId: 7, crewId: 5, dateCompleted: moment().day(-50) },
    { status: 'Completed', userId: 7, crewId: 5, dateCompleted: moment().day(-60) },
  ]

  const orders = await Promise.all(orderData.map(data => Order.create(data)))

  const randomUpvote = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  const mappedPotholes = potholes.map((pothole, index) => {

    return {
      createdAt: pothole.creation_date,
      completionDate: pothole.completion_date,
      status: pothole.status,
      serviceNumber: pothole.service_request_number,
      streetAddress: pothole.street_address,
      ward: pothole.ward > 0 ? pothole.ward : null,
      zip: pothole.zip,
      latitude: pothole.latitude,
      longitude: pothole.longitude,
      mostRecentAction: pothole.most_recent_action,
      upVotes: randomUpvote(),
      location: pothole.location,
    };
  });

  await Pothole.bulkCreate(mappedPotholes);
  const numPotholes = await Pothole.count();

  const completedPotholes = await Pothole.findAll(
    {
      where: {
        status: 'Completed'
      },
      limit: 100,
    }
  )

  let orderId = 1
  const potholeOrders = completedPotholes.map((pothole) => {
    if (orderId > orderData.length) orderId = 1
    pothole.orderId = orderId
    orderId++
    return pothole.save()
  })

  await Promise.all(potholeOrders)
  await Pothole.createOrders()

  // demonstration purposes
  const fullstackPothole = {
    createdAt: moment().day(-2),
    status: 'Open',
    serviceNumber: '18-01982794',
    imageUrl: "http://res.cloudinary.com/pothole-patrol/image/upload/q_25/v1530488413/IMG_20180620_065259.jpg",
    latitude: 41.895526,
    longitude: -87.639775,
    location: {
      type: 'POINT',
      coordinates: [-87.639775, 41.895526]
    },
    upVotes: 4,
    zip: 60654,
    streetAddress: '400 W Superior St',
    description: 'This is a really dangerous pothole near the pedestrian path. I almost tripped in it!',
    placement: 'Curb Lane',
    ward: 42,
  }

  await Pothole.create(fullstackPothole)

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${crew.length} crews`);
  console.log(`seeded ${numPotholes} potholes`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);
}

if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err);
      process.exitCode = 1;
    })
    .then(() => {
      // `finally` is like then + catch. It runs no matter what.
      console.log('closing db connection');
      db.close();
      console.log('db connection closed');
    });
  console.log('seeding...');
}

module.exports = seed;
