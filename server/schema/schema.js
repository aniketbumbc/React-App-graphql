//define type , relationship type, define root query (front end to query)

const graphql = require('graphql');

//grab different property from grapql package

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const _ = require('loadsh');

var books = [{
        name: 'Wings of Fire',
        genre: 'Fantasy',
        id: '1'
    },
    {
        name: 'Wings of Fire-1',
        genre: 'Fantasy',
        id: '2'
    },
    {
        name: 'Wings of Fire-2',
        genre: 'Fantasy',
        id: '2'
    }
];


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
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                //code get data form db
                return _.find(books, {
                    id: args.id
                });

            }
        }
    }

});



// which query user to allow to use

module.exports = new GraphQLSchema({
    query: RootQuery
})