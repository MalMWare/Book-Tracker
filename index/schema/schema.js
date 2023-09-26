//const { books, authors } = require('./sampleData')
const _ = require('lodash')
global._ = _

//Mongoose Models
const Book = require('../models/Book');
const Author = require('../models/Author')

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLList
} = require('graphql');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        pages: { type: GraphQLInt },
        published: { type: GraphQLString },
        awards: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                //console.log(parent);
                return _.find(Author, { id: parent.authorId });
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
        nationality: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //console.log(parent)
                return _.filter(Book, { authorId: parent.id })
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
                //console.log(typeof(args.id))
                return _.find(Book,{ id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                //code to get data from database/other source
                //console.log(typeof(args.id))
                return _.find(Author, { id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find()
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find()
            }
        }
    }
});

//mutations

module.exports = new GraphQLSchema({
    query: RootQuery
})