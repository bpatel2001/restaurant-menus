const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
const {seedRestaurant, seedMenu, seedItem} = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        const restaurant = await Restaurant.create(seedRestaurant[0]);

        expect(restaurant.name).toEqual('AppleBees');
        expect(restaurant.location).toEqual('Texas');
        expect(restaurant.cuisine).toEqual('FastFood');
    });

    test('can create a Menu', async () => {
        // TODO - write test
        const menu = await Menu.create(seedMenu[0]);

        expect(menu.title).toEqual('Breakfast');
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual('AppleBees');
        expect(restaurant.location).toEqual('Texas');
        expect(restaurant.cuisine).toEqual('FastFood');

        const updatedRestaurant = await restaurant.update({
            name: `Los Pollos Hermanos`,
            location: 'New Mexico',
            cuisine: 'American',
        });

        expect(updatedRestaurant.name).toEqual('Los Pollos Hermanos');
        expect(updatedRestaurant.location).toEqual('New Mexico');
        expect(updatedRestaurant.cuisine).toEqual('American');
    });

    test('can find Menus', async () => {
        // TODO - write test
        const menu = await Menu.findByPk(1);
        expect(menu.title).toEqual('Breakfast');
        const updatedMenu = await menu.update({
            title: 'Lunch',
        });
        expect(updatedMenu.title).toEqual('Lunch');
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual('Los Pollos Hermanos');
        expect(restaurant.location).toEqual('New Mexico');
        expect(restaurant.cuisine).toEqual('American');
        await restaurant.destroy();
        const deletedRestaurant = await Restaurant.findAll();
        expect(deletedRestaurant.length).toEqual(0);
    });

    test('can delete Menus', async () => {
        // TODO - write test
        const menu = await Menu.findByPk(1);
        expect(menu.title).toEqual('Lunch');
        await menu.destroy();
        const deletedMenu = await Menu.findAll();
        expect(deletedMenu.length).toEqual(0);
    });

    test('Restaurant can have multiple Menus', async () => {
        // TODO - write test
        const restaurant = await Restaurant.create(seedRestaurant[0]);
        const menu = await restaurant.createMenu(seedMenu[0]);
        expect(menu.title).toEqual('Breakfast');
        const menus = await restaurant.getMenus();
        expect(menus.length).toEqual(1);
    });

    test('Menu can belong to one Restaurant', async () => {
        const restaurant = await Restaurant.create(seedRestaurant[0]);
        const menu = await restaurant.createMenu(seedMenu[0]);
        const associatedRestaurant = await menu.getRestaurant();
        expect(associatedRestaurant.name).toEqual('AppleBees');
    });

    test('can create an Item', async () => {
        // TODO - write test
        const item = await Item.create(seedItem[0]);
        expect(item.name).toEqual('bhindi masala');
        expect(item.image).toEqual('someimage.jpg');
        expect(item.price).toEqual(9.50);
        expect(item.vegetarian).toEqual(true);
    });

    test('can find an Item', async () => {
        // TODO - write test
        const item = await Item.findByPk(1);
        expect(item.name).toEqual('bhindi masala');
        expect(item.image).toEqual('someimage.jpg');
        expect(item.price).toEqual(9.50);
        expect(item.vegetarian).toEqual(true);
    });

    test('can delete an Item', async () => {
        // TODO - write test
        const item = await Item.findByPk(1);
        expect(item.name).toEqual('bhindi masala');
        expect(item.image).toEqual('someimage.jpg');
        expect(item.price).toEqual(9.50);
        expect(item.vegetarian).toEqual(true);
        await item.destroy();
        const deletedItem = await Item.findAll();
        expect(deletedItem.length).toEqual(0);
    });

    // Eager Loading - Attempt
    test('can find all Menus and include their Items', async () => {
        // TODO - write test
        const restaurant = await Restaurant.create(seedRestaurant[0]);
        const menu = await restaurant.createMenu(seedMenu[0]);
        const item = await Item.create(seedItem[0]);
        await menu.addItem(item);
        const menus = await Menu.findAll({
            include: Item
        });
        expect(menus.length).toEqual(3);
        expect(menus[2].Items.length).toEqual(1);
    });

});
