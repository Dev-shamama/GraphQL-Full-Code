import { ApolloServer } from '@apollo/server';
import { resolvers } from "./resolvers/resolvers.js";
import { schema } from "./schema/schema.js";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
const connectGraphQl = () => {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolvers,
    });
    return server
}
export default connectGraphQl;