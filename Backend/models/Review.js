const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    id: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:   true
    },
    service_request_id: {
      type:      DataTypes.UUID,
      allowNull: false,
      unique:    true
    },
    provider_id: {
      type:      DataTypes.UUID,
      allowNull: false
    },
    customer_id: {
      type:      DataTypes.UUID,
      allowNull: false
    },
    rating: {
      type:      DataTypes.INTEGER,
      allowNull: false,
      validate:  { min: 1, max: 5 }
    },
    comment: {
      type: DataTypes.TEXT
    }
  }, {
    tableName:       'reviews',
    freezeTableName: true,
    timestamps:      true,
    underscored:     true
  });

  return Review;
};