const User = require('./user');
const Pothole = require('./pothole');
const Order = require('./order');
const Comment = require('./comment');
const Crew = require('./crew');

Pothole.belongsTo(User, { as: 'reporter' });
User.hasMany(Pothole, { foreignKey: 'reporterId' });

Order.hasMany(Pothole);
Pothole.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

Crew.hasMany(Order);
Order.belongsTo(Crew);

Crew.hasMany(User);
User.belongsTo(Crew);

User.hasMany(Comment);
Comment.belongsTo(User);

Pothole.hasMany(Comment);
Comment.belongsTo(Pothole);

Pothole.belongsToMany(User, { through: 'upvotes', as: 'upvoters' });

User.belongsToMany(Pothole, { through: 'upvotes', as: 'upvoted' });

// class methods
Order.createOrderForCrew = async function(crewId) {
  const openPotholes = await Pothole.findAll({
    attributes: [
      'id',
      'priority',
    ],
    where: [{ status: 'Open', orderId: null }],
    limit: 500,
  });

  openPotholes.sort((a, b) => b.priority - a.priority)
  const adminUser = await User.findOne({
    where: {
      type: 'admin'
    }
  })

  const order = await this.create({
    status: 'Requested',
    crewId,
    userId: adminUser.id
  })

  return order.addPothole(openPotholes[0])
}

module.exports = {
  User,
  Pothole,
  Order,
  Comment,
  Crew,
};
