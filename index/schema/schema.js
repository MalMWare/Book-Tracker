// import { graphqlHTTP } from 'express-graphql';
const  graphql  = require('graphql');
const _ = require('lodash')
//import { graphqlLodash } from 'graphql-lodash';
global._ = _
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList
} = graphql;

//Dummy data
let books = [
    { name: 'Attack on Titan Vol. 01', genre: 'Horror', pages: '193', published: 'March 17, 2010', id: '1', authorId: '1' },
    { name: 'Lore Olympus Vol. 01', genre: 'Fantasy', pages: '384', published: 'November 2, 2021', id: '2', authorId: '2' },
    { name: 'The Song of Achilles', genre: 'Historical Fiction', pages: '408', published: 'September 20, 2011', id: '3', authorId: '3' },
    { name: 'Attack on Titan Vol. 02', genre: 'Horror', pages: '189', published: 'July 17, 2010', id: '4', authorId: '1' },
    { name: 'Attack on Titan Vol. 03', genre: 'Horror', pages: '208', published: 'December 9, 2010', id: '5', authorId: '1' },
    { name: 'Circe', genre: 'Fantasy', pages: '393', published: 'April 10, 2018', id: '6', authorId: '3' },
    { name: 'Lore Olympus Vol. 02', genre: 'Fantasy', pages: '368', published: 'July 5, 2022', id: '7', authorId: '2' }
]

let authors = [
    { name: 'Hajime Isayama', age: 37, id: '1' },
    { name: 'Rachel Smythe', age: 37, id: '2' },
    { name: 'Madeline Miller', age: 45, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        pages: { type: GraphQLString },
        published: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent)
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database/other source
                console.log(typeof(args.id))
                return _.find(books,{ id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database/other source
                console.log(typeof(args.id))
                return _.find(authors, { id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})