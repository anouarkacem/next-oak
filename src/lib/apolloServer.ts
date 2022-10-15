import { ApolloServer } from "apollo-server-micro";
import { schema } from "@modules/graphql/schema";
import { context } from "../types/context";

const server = new ApolloServer({
  schema,
  context,
});

export { server };
