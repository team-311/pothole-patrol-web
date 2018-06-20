const Sequelize = require('sequelize')
const db = require('../db')

const Crew = db.define('crew', {
  name: Sequelize.STRING
})

module.exports = Crew
