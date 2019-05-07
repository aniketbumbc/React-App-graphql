//define type , relationship type, define root query (front end to query)

const graphql = require('graphql');

//grab different property from grapql package

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
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
        id: '3',
        authorId:'3'
    },
    {
        name: 'Wings of Fire-100',
        genre: 'Fantasy',
        id: '4',
        authorId:'2'
    },
    {
        name: 'Wings of Fire-200',
        genre: 'Fantasy',
        id: '5',
        authorId:'3'
    },
    {
        name: 'Wings of Fire-300',
        genre: 'Fantasy',
        id: '6',
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
    id: '3'
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
        },
        books:{
            type:GraphQLList(BookType),
            resolve(parent,args){
                console.log(parent)
                    //find in books array author Id which == parent id in author array
                return _.filter(books,{authorId:parent.id});
            }
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
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }

    }

});


//Mutation for data

// const Mutation = new GraphQLObjectType({
//     name:Mutation,
//     fields:{
//         addAuthor:{
//             type:AuthorType,
//             args:{
//                 name:{type:GraphQLString},
//                 age:{type:GraphQLInt}
//             },

//             resolve(parent,args){

               

//             }

//         }

//     }
// })






// which query user to allow to use

module.exports = new GraphQLSchema({
    query: RootQuery
})