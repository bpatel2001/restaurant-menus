const { sequelize } = require('../db');
const { Sequelize } = require('sequelize');


// TODO - create an Item model
const Item = sequelize.define('Item', {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.INTEGER,
    vegetarian: Sequelize.BOOLEAN
});

module.exports = {Item};