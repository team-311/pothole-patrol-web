const User = require('./user')
const Pothole = require('./pothole')
const Order = require('./order')
const Comment = require('./comment')
const Crew = require('./crew')

Pothole.belongsTo(User, {foreignKey: 'reporterId'})
User.hasMany(Pothole, {foreignKey: 'reporterId'})

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

Pothole.belongsToMany(User, {through: 'upvotes'})
User.belongsToMany(Pothole, {through: 'upvotes'})

module.exports = {
  User,
  Pothole,
  Order,
  Comment,
  Crew,
}
