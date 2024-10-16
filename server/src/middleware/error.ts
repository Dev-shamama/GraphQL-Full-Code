import { ApolloError, UserInputError, AuthenticationError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';

const formatError = (err: GraphQLError) => {
  // Handle specific error types here
  if (err.extensions.code === 'GRAPHQL_VALIDATION_FAILED') {
    return new UserInputError(err.message, { code: 'GRAPHQL_VALIDATION_FAILED' });
  }

  if (err.extensions.code === 'UNAUTHENTICATED') {
    return new AuthenticationError(err.message, { code: 'UNAUTHENTICATED' });
  }

  // Handle MongoDB duplicate key error
  if (err.message.includes('duplicate key')) {
    return new ApolloError('Duplicate entry', 'DUPLICATE_KEY_ERROR', { code: 'DUPLICATE_KEY_ERROR' });
  }

  // Fallback to a generic error
  return new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR', { code: 'INTERNAL_SERVER_ERROR' });
};

export default formatError;
