const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

// TODO - create a one-to-many relationship between Restaurant and Menu
Restaurant.hasMany(Menu, {
    foreignKey: 'restaurantId',
    sourceKey: 'id'
});

Menu.belongsTo(Restaurant, {
    foreignKey: 'restaurantId',
    targetKey: 'id'
});

Item.belongsTo(Menu, {
    foreignKey: 'menuId',
    targetKey: 'id'
});



module.exports = { Restaurant, Menu, Item }
