'use strict'

const db = require('../server/db')
const {User, Pothole, Crew, Order} = require('../server/db/models')
const {potholes} = require('../script/potholes.json')
const Sequelize = require('sequelize')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({firstName: 'Cody', lastName: 'Murphy', type: 'admin',  email: 'cody@email.com', password: '123'}),
    User.create({firstName: 'Cordy', lastName: 'Mabrother', type: 'admin', email: 'murphy@email.com', password: '123'}),
    User.create({firstName: 'George', lastName: 'Washington', type: 'admin', email: 'george@email.com', password: '123'}),
    User.create({firstName: 'Alexander', lastName: 'Hamilton', type: 'admin', email: 'alexander@email.com', password: '123'}),
    User.create({firstName: 'Aaron', lastName: 'Burr', type: 'admin', email: 'aaron@email.com', password: '123'}),
    User.create({firstName: 'Eliza', lastName: 'Schuyler', type: 'admin', email: 'eliza@email.com', password: '123'}),
    User.create({firstName: 'Peggy', lastName: 'Schuyler', type: 'admin', email: 'peggy@email.com', password: '123'})
  ])

  const crew = await Promise.all([
    Crew.create({name: 'Moses Men'}),
    Crew.create({name: 'Schuyler Shandies'}),
    Crew.create({name: 'Rough Riders'}),
    Crew.create({name: 'French People'}),
    Crew.create({name: 'French People'}),
  ])

  const newDate = new Date()

  const orders = await Promise.all([
    Order.create({status: 'Requested', userId: 1, crewId: 1}),
    Order.create({status: 'Requested', userId: 2, crewId: 2}),
    Order.create({status: 'Requested', userId: 2, crewId: 2}),
    Order.create({status: 'In Progress', userId: 3, crewId: 3}),
    Order.create({status: 'In Progress', userId: 4, crewId: 3}),
    Order.create({status: 'In Progress', userId: 4, crewId: 4}),
    Order.create({status: 'In Progress', userId: 4, crewId: 4}),
    Order.create({status: 'In Progress', userId: 4, crewId: 5}),
    Order.create({status: 'Completed', userId: 5, crewId: 5, dateCompleted: newDate}),
    Order.create({status: 'Completed', userId: 6, crewId: 5, dateCompleted: newDate}),
    Order.create({status: 'Completed', userId: 7, crewId: 5, dateCompleted: newDate}),
    Order.create({status: 'Completed', userId: 7, crewId: 5, dateCompleted: newDate}),
  ])

  const mappedPotholes = potholes.map((pothole, index) => {
    let orderId
    if (!(index % 3)) orderId = 1
    if (!(index % 16)) orderId = 2
    if (!(index % 5)) orderId = 3
    if (!(index % 27)) orderId = 4
    if (!(index % 100)) orderId = 5
    if (!(index % 56)) orderId = 6

    return {
    createdAt: pothole.creation_date,
    completionDate: pothole.completion_date,
    status: pothole.status,
    serviceNumber: pothole.service_request_number,
    streetAddress: pothole.street_address,
    ward: pothole.ward,
    zip: pothole.zip,
    latitude: pothole.latitude,
    longitude: pothole.longitude,
    mostRecentAction: pothole.most_recent_action,
    orderId: orderId
  }})

  await Pothole.bulkCreate(mappedPotholes)
  const numPotholes = await Pothole.count()



  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${crew.length} crews`)
  console.log(`seeded ${numPotholes} potholes`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

if (module === require.main) {
  seed()
  .catch(err => {
    console.error(err)
    process.exitCode = 1
  })
  .then(() => { // `finally` is like then + catch. It runs no matter what.
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
  console.log('seeding...')
}

module.exports = seed
