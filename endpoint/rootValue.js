const Users = require('../models/Users');
const Properties = require('../models/Properties');
const { Op } = require('sequelize');

const RootValue = {
    users: () => {
        return Users.findAll();
    },

    properties: async () => {
        const properties = await Properties.findAll();
        
        return propertiesWithUsers = await Promise.all(
            properties.map(async property => {
                const user = await Users.findByPk(property.user_id);
                if (user) {
                    return { ...property.dataValues, user };
                } else {
                    return { ...property.dataValues, user: null };
                }
            }
        ));
    },

    searchProperty: async args => {
        const { query } = args;
        const properties = await Properties.findAll({
            where: {
                [Op.or]: [
                    { '$user.firstName$': { [Op.iLike]: `%${query}%` } },
                    { '$user.lastName$': { [Op.iLike]: `%${query}%` } },
                    { street: { [Op.iLike]: `%${query}%` } },
                    { city: { [Op.iLike]: `%${query}%` } },
                    { state: { [Op.iLike]: `%${query}%` } },
                    { zip: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: Users
        });
        return properties;
    },

    createUser: args => {
        const user = new Users({
            id: uuidv4().replaceAll('-', ''),
            firstName: args.userInput.firstName,
            lastName: args.userInput.lastName
        });
        return user.save();
    },

    createProperty: args => {
        const property = new Properties({
            id: uuidv4().replaceAll('-', ''),
            street: args.propertyInput.street,
            city: args.propertyInput.city,
            state: args.propertyInput.state,
            zip: args.propertyInput.zip,
            rent: args.propertyInput.rent
        });
        return property.save();
    }
}

module.exports = RootValue