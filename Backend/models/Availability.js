const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Availability = sequelize.define('Availability', {
    id: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:   true
    },
    provider_id: {
      type:      DataTypes.UUID,
      allowNull: false
    },
    date: {
      type:      DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
      type:      DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type:      DataTypes.TIME,
      allowNull: false
    },
    is_booked: {
      type:         DataTypes.BOOLEAN,
      allowNull:    false,
      defaultValue: false
    }
  }, {
    tableName:       'availability',
    freezeTableName: true,
    timestamps:      false,
    underscored:     true
  });

  return Availability;
};