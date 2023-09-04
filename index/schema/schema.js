// import { graphqlHTTP } from 'express-graphql';
const  graphql  = require('graphql');
const _ = require('lodash')
//import { graphqlLodash } from 'graphql-lodash';
global._ = _
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Dummy data
let books = [
    { name: 'Attack on Titan Vol. 01', genre: 'Horror', id: '1'},
    { name: 'Lore Olympus', genre: 'Fantasy', id: '2'},
    { name: 'The Song of Achilles', genre: 'Historical Fiction', id: '3'},
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                //code to get data from database/other source
                return _.find(books,{ id: args.id })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})