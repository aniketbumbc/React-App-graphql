//define type , relationship type, define root query (front end to query)

const graphql = require('graphql');

//grab different property from grapql package

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const _ = require('loadsh');

var books = [{
        name: 'Wings of Fire',
        genre: 'Fantasy',
        id: '1',
        authorId:'1'  //relationship with author collection
    },
    {
        name: 'Wings of Fire-1',
        genre: 'Fantasy',
        id: '2',
        authorId:'2'
    },
    {
        name: 'Wings of Fire-2',
        genre: 'Fantasy',
        id: '2',
        authorId:'3'
    }
];


var authors = [{
    name: 'Randy paushye',
    age: 33,
    id: '1'
},
{
    name: 'Simon Sinek',
    age: 42,
    id: '2'
},
{
    name: 'terry',
    age: 66,
    id: '2'
}
];


//Object Type of graph
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
       
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors,{id:parent.authorId});
            }
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
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //code get data form db
                return _.find(books, {
                    id: args.id
                });

            }
        },

        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, {
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