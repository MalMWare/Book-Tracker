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
    GraphQLList,
    GraphQLNonNull
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
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add a book
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: GraphQLNonNull(GraphQLString)
                },
                pages: {
                    type: GraphQLString
                },
                published: {
                    type: GraphQLNonNull(GraphQLString)
                },
                awards: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parent, args) {
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    pages: args.pages,
                    published: args.published,
                    awards: args.awards,
                    authorId: args.authorId,
                });

                return book.save();
            }
        },
        //add an author
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: GraphQLString
                },
                nationality: {
                    type: GraphQLString
                },
                bookId: {
                    type: GraphQLNonNull(GraphQLID)
                },
            },
            resolve(parent, args) {
                const author = new Author({
                    name: args.name,
                    age: args.name,
                    nationality: args.nationality,
                    bookId: args.bookId
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})