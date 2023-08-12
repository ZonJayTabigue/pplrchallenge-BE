const Users = require('../models/Users');
const Properties = require('../models/Properties');
const { Op } = require('sequelize');

const RootValue = {
    users: () => {
        return Users.findAll();
    },

    properties: async () => {
        const properties = await Properties.findAll({include: Users});
        
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

    search: async ({ query }) => {
        const searchStr = query.split(' ');

        const userResults = await Users.findAll({
            where: {
            [Op.or]: searchStr.map(word => ({
                [Op.or]: [
                { firstName: { [Op.iLike]: `%${word}%` } },
                { lastName: { [Op.iLike]: `%${word}%` } }
                ]
            }))
            }
        });
        
        if (userResults.length > 0) {
            const results = await Promise.all(
                userResults.map(async user => {
                  const userProperties = await Properties.findAll({
                    where: {
                      user_id: user.id
                    }
                  });
                  user.id = user.id;
                  user.properties = userProperties;
                  return user ;
                })
            );
            return [{ users: results }];
        } else {
            const propertyResults = await Properties.findAll({
                where: {
                [Op.or]: searchStr.map(word => ({
                    [Op.or]: [
                        { street: { [Op.iLike]: `%${word}%` } },
                        { city: { [Op.iLike]: `%${word}%` } },
                        { state: { [Op.iLike]: `%${word}%` } },
                        { zip: { [Op.iLike]: `%${word}%` } }
                        ]
                }))
                },
                include: Users
            });
            return [{ properties: propertyResults }];
        }
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