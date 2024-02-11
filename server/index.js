const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const users = [{id: 9, username: "Maksym", age: 17}];

const app = express();
app.use(cors());

const createUser = (input) => {
    const id = Date.now();
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users;
    },

    getUser: ({id}) => {
        return users.find(user => user.id == id);
    },

    createUser: ({input}) => {
        const user = createUser(input);
        users.push(user);
        return user
    }
}


app.use("/graphql", graphqlHTTP({
    // enables UI in browser to test our api
    graphiql: true,
    schema,
    rootValue: root
}));

app.listen(5000, () => {
    console.log("Server started on port 5000. Dev mode...")
});