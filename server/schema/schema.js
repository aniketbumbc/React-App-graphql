//define type , relationship type, define root query (front end to query)

const graphql = require('graphql');

//grab different property from grapql package

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;


//Object Type of graph
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
});

// query for front end to access root
const RootQuery = new GraphQLObjectType({

    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){

                //args.id
                //code get data form db
            }
        }
    }

});



// which query user to allow to use
module.exports = new GraphQLSchema ({
    query:RootQuery
})