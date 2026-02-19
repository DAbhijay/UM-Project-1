const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServiceProvider = sequelize.define('ServiceProvider', {
    id: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:   true
    },
    user_id: {
      type:      DataTypes.UUID,
      allowNull: false,
      unique:    true
    },
    service_type: {
      type:      DataTypes.ENUM('electrician','plumber','carpenter','tailor','maintenance'),
      allowNull: false
    },
    experience_years: {
      type:         DataTypes.INTEGER,
      allowNull:    false,
      defaultValue: 0,
      validate:     { min: 0 }
    },
    is_verified: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: false
    },
    bio: {
      type: DataTypes.TEXT
    },
    avg_rating: {
      type:         DataTypes.FLOAT,
      allowNull:    false,
      defaultValue: 0,
      validate:     { min: 0, max: 5 }
    }
  }, {
    tableName:       'service_providers',
    freezeTableName: true,
    timestamps:      true,
    underscored:     true
  });

  return ServiceProvider;
};
