const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const  { buildSchema } = require('graphql');
const db = require('./config/db');
const cors = require('cors');

const Schema = require('./endpoint/schema');
const RootValue = require('./endpoint/rootValue');
const Properties = require('./models/Properties');
const Users = require('./models/Users');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: RootValue,
    graphiql: true
}));

// app.get('/properties', async (req, res) => {
//     const properties = await Properties.findAll({
//         include: Users // Include the associated User data
//     });
//     res.json(properties);
// });

app.listen(8000);

// Test DB Connection
db.authenticate()
.then(() => console.log('Database connection established...'))
.catch(err => console.log('Error: ' +  err));

module.exports = app;