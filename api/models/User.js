const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    getFullname() {
      return [this.firstName, this.lastName].join(' ');
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isLongEnough: (val) => {
            if (val.length < 4) {
              throw new Error('Please choose a longer username');
            }
          },
        },
      },
      passwordHash: { type: DataTypes.STRING },
      role: {
        type: DataTypes.STRING,
        isIn: [['admin', 'participant']],
      },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          isLongEnough: (val) => {
            if (val.length < 7) {
              throw new Error('Please choose a longer password');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Room, {
      foreignKey: 'roomId',
    });
    User.hasMany(models.RoomChat, {
      foreignKey: 'userId',
    });
    User.hasMany(models.MicroPost, {
      foreignKey: 'userId',
    });
  };

  User.beforeSave((user, options) => {
    if (user.password) {
      user.passwordHash = bcrypt.hashSync(user.password, 10);
    }
  });

  return User;
};
