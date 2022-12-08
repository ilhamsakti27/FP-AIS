module.exports = (sequelize, sequelize)=>{
    const order = sequelize.define("orders",{
        order_id: Sequelize.STRING,
        phone: Sequelize.STRING,
        total: Sequelize.INT,
    })
    return order;
}