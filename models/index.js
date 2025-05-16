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


//Create a Many-to-Many relationship between Menu and Item
Menu.belongsToMany(Item, {
    through: 'MenuItem',
    foreignKey: 'menuId',
    otherKey: 'itemId'
});

Item.belongsToMany(Menu, {
    through: 'MenuItem',
    foreignKey: 'itemId',
    otherKey: 'menuId'
});



module.exports = { Restaurant, Menu, Item }
