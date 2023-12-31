const  { buildSchema } = require('graphql');

const Schema = buildSchema(`
        type User {
            id: String!
            firstName: String!
            lastName: String!
        }

        type Property {
            id: String!
            street: String!
            city: String!
            state: String!
            zip: String!
            rent: Int!
            user: User
        }

        input UserInput {
            id: String!
            firstName: String!
            lastName: String!
        }

        input PropertyInput {
            id: String!
            street: String!
            city: String!
            state: String!
            zip: String!
            rent: Int!
        }

        type UserResult {
            id: String!
            firstName: String!
            lastName: String!,
            properties: [Property!]
        }

        type Results {
            users: [UserResult!]
            properties: [Property!]
        }

        type RootQuery {
            users: [User!]!
            properties: [Property!]!
            search(query: String!): [Results!]
        }

        type RootMutation {
            createUser(userInput: UserInput): User
            createProperty(propertyInput: PropertyInput): Property
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
`);

module.exports = Schema;