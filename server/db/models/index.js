const User = require('./user')
const Pothole = require('./pothole')
const Order = require('./order')
const Comment = require('./comment')
const Crew = require('./crew')
const Upvote = require('./upvote')

Pothole.belongsTo(User, {foreignKey: 'reporterId'})

Order.hasMany(Pothole)
Pothole.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

Crew.hasMany(Order)
Order.belongsTo(Crew)

Crew.hasMany(User)
User.belongsTo(Crew)

User.hasMany(Comment)
Comment.belongsTo(User)

Pothole.hasMany(Comment)
Comment.belongsTo(Pothole)

Pothole.belongsToMany(User, {through: Upvote})
// Pothole.hasMany(Upvote)
// User.hasMany(Upvote)
// // Upvote.belongsTo(Pothole)
// // Upvote.belongsto(User)

module.exports = {
  User,
  Pothole,
  Order,
  Comment,
  Crew,
  Upvote
}
