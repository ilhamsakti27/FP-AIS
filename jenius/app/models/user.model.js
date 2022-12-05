module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {


    no_hp: {
      type: Sequelize.STRING
    },

    username: {
      type: Sequelize.STRING
    },

    nik: {
      type: Sequelize.STRING
    },

    pin: {
      type: Sequelize.STRING
    },

    email: {
      type: Sequelize.STRING
    },

    password: {
      type: Sequelize.STRING
    },

    saldo: {
      type: Sequelize.BIGINT
    },

  });

  return User;
};
