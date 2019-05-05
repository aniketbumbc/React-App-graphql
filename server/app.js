const express = require('express');
const graphqlHTTP = require('express-graphql'); // allow express to understand graph ql

const app = express();

app.use('/graphql', graphqlHTTP({

}));


app.listen(4000, () => {
    console.log("App start at 4000");
})