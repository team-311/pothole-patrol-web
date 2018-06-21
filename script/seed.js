'use strict'

const db = require('../server/db')
const {User, Pothole} = require('../server/db/models')
const {potholes} = require('../script/potholes.json')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  const users = await Promise.all([
    User.create({firstName: 'Cody', lastName: 'Murphy', email: 'cody@email.com', password: '123'}),
    User.create({firstName: 'Cordy', lastName: 'Mabrother', email: 'murphy@email.com', password: '123'})
  ])

  const mappedPotholes = potholes.map(pothole => ({
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
  }))

  await Pothole.bulkCreate(mappedPotholes)
  const numPotholes = await Pothole.count()

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${numPotholes} potholes`)
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
