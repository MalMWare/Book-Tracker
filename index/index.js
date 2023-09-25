const express = require('express');
const cors = require('cors')
require('dotenv').config();
const schema = require('./schema/schema')
const connectDB = require('./config/db')
const { graphqlHTTP } = require('express-graphql');
const port = process.env.PORT 
const app = express()

//Connect to Database
connectDB();
//allow cross origin requests
app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//binds express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV = 'development'
}));

app.listen(port, () => {
    console.log(`Rocking on port: ${port}`)
})