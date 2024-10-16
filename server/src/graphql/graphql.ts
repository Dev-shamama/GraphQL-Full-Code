import { ApolloServer } from '@apollo/server';
import { resolvers } from "./resolvers/resolvers.js";
import { schema } from "./schema/schema.js";
import formatError from "../middleware/error.js"

const connectGraphQl = () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
        // formatError,
    });
    return server
}
export default connectGraphQl;