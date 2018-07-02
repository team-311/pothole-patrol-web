const Sequelize = require('sequelize');
const db = require('../db');

const Crew = db.define('crew', {
  name: {
    type: Sequelize.STRING,
  },
  contactNumber: {
    type: Sequelize.STRING,
    validate: {
      isNumeric: true,
    },
  },
});

module.exports = Crew;
