const express = require('express');
const graphqlHTTP = require('express-graphql'); // allow express to understand graph ql

const schema = require('./schema/schema');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://bunny:Aniket@gql-info-bvnef.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open',()=>{
    console.log("connected to Database");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));


app.listen(4000, () => {
    console.log("App start at 4000");
})


//mutation is add,edit and delete
