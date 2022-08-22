const path = require("path");
const express = require("express");

const { loadFilesSync } = require("@graphql-tools/load-files");
const { graphqlHTTP } = require("express-graphql");

const { makeExecutableSchema } = require("@graphql-tools/schema");

const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));
const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const app = express();

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL server...");
});
