"use strict";

const fs = require("fs");
const path = require("path");
const fastify = require("fastify")({
  logger: {
    prettyPrint: require("pino-pretty"),
  },
});
// const Fastify = require("fastify");
const mercurius = require("mercurius");
const resolvers = require("./graphql/resolvers");

// const fastify = new Fastify({
//   logger: {
//     prettyPrint: require("pino-pretty"),
//   },
// });

const schema = fs.readFileSync(
  path.join(__dirname, "graphql", "schema.gql"),
  "utf-8"
);

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: "playground",
  playgroundHeaders(window) {
    return {
      authorization: `bearer ${window.sessionStorage.getItem("token")}`,
    };
  },
});

fastify.listen(3000);
