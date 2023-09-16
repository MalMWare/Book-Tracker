const express = require('express');
const cors = require('cors')
const schema = require('./schema/schema')
const { graphqlHTTP } = require('express-graphql');
const app = express()
const port = process.env.PORT || 3000;

//allow cross origin requests
app.use(cors())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

//binds express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(port, () => {
    console.log(`Rocking on port ${port}`)
})