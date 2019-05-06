const express = require('express');
const graphqlHTTP = require('express-graphql'); // allow express to understand graph ql

const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));


app.listen(4000, () => {
    console.log("App start at 4000");
})