const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {
  static associate(models) {
  Role.belongsTo(models.User, {
    foreignKey: 'user_id',
  });
}
}

Role.init (
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
  }
);

module.exports = Role;