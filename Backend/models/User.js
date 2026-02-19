const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
    id: {
      type:         DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:   true
    },
    email: {
      type:         DataTypes.STRING(255),
      allowNull:    false,
      unique:       true,
      validate:     { isEmail: true }
    },
    password_hash: {
      type:      DataTypes.STRING(255),
      allowNull: false
    },
    full_name: {
      type:      DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type:         DataTypes.ENUM('customer', 'provider', 'admin'),
      allowNull:    false,
      defaultValue: 'customer'
    },
    phone: {
      type:   DataTypes.STRING(15),
      unique: true
    },
    address: {
      type: DataTypes.TEXT
    }
  }, {
    tableName:  'users',
    freezeTableName: true,       
    timestamps: true,            
    underscored: true   
    });

    return User;
}