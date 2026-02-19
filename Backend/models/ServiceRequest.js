const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServiceRequest = sequelize.define('ServiceRequest', {
    id: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:   true
    },
    customer_id: {
      type:      DataTypes.UUID,
      allowNull: false
    },
    provider_id: {
      type: DataTypes.UUID
    },
    service_type: {
      type:      DataTypes.ENUM('electrician','plumber','carpenter','tailor','maintenance'),
      allowNull: false
    },
    description: {
      type:      DataTypes.TEXT,
      allowNull: false
    },
    address: {
      type:      DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type:         DataTypes.ENUM('PENDING','ACCEPTED','REJECTED','IN_PROGRESS','COMPLETED'),
      allowNull:    false,
      defaultValue: 'PENDING'
    },
    scheduled_at: {
      type: DataTypes.DATE 
    }
  }, {
    tableName:       'service_requests',
    freezeTableName: true,
    timestamps:      true,
    underscored:     true
  });

  return ServiceRequest;
};