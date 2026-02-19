const sequelize = require('sequelize');
const dbConfig  = require('../config/database');

// ── 1. connection ───────────────────────────────────────────
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host:     dbConfig.host,
    dialect:  'postgres',
    logging:  process.env.NODE_ENV === 'development' ? console.log : false
  }
);

// ── 2. import & register models ─────────────────────────────
const User            = require('./User')(sequelize);
const ServiceProvider = require('./ServiceProvider')(sequelize);
const ServiceRequest  = require('./ServiceRequest')(sequelize);
const Availability    = require('./Availability')(sequelize);
const Review          = require('./Review')(sequelize);

// ── 3. associations ─────────────────────────────────────────

User.hasOne(ServiceProvider,  { foreignKey: 'user_id', as: 'providerProfile' });
ServiceProvider.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(ServiceRequest, { foreignKey: 'customer_id', as: 'myRequests' });
ServiceRequest.belongsTo(User, { foreignKey: 'customer_id', as: 'customer' });

ServiceProvider.hasMany(ServiceRequest, { foreignKey: 'provider_id', as: 'assignedRequests' });
ServiceRequest.belongsTo(ServiceProvider, { foreignKey: 'provider_id', as: 'provider' });

ServiceProvider.hasMany(Availability, { foreignKey: 'provider_id', as: 'slots' });
Availability.belongsTo(ServiceProvider, { foreignKey: 'provider_id', as: 'provider' });

ServiceRequest.hasOne(Review,          { foreignKey: 'service_request_id', as: 'review' });
Review.belongsTo(ServiceRequest,       { foreignKey: 'service_request_id', as: 'serviceRequest' });
ServiceProvider.hasMany(Review,        { foreignKey: 'provider_id',        as: 'reviews' });
Review.belongsTo(ServiceProvider,      { foreignKey: 'provider_id',        as: 'provider' });
User.hasMany(Review,                   { foreignKey: 'customer_id',        as: 'myReviews' });
Review.belongsTo(User,                 { foreignKey: 'customer_id',        as: 'customer' });

// ── 4. export ────────────────────────────────────────────────
module.exports = {
  sequelize,
  Sequelize,
  User,
  ServiceProvider,
  ServiceRequest,
  Availability,
  Review
};