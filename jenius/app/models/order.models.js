module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
       
      kode_bayar: {
        type: Sequelize.STRING
      },
      
      no_hp: {
        type: Sequelize.STRING
      },
  
      username: {
        type: Sequelize.STRING
      },
  
      total: {
        type: Sequelize.INTEGER
      },

    });
  
    return Order;
  };
  