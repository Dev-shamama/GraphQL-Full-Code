export const schema = `#graphql

scalar Upload

type File {
    url: String!
}

type Id {
  oid: String
}

type Banner {
  imageLink: String
  status: String
  createAt: String!
  id: ID
}

type User {
  success: Int
  message: String
  name: String
  email: String
  password: String
  id: ID
  createAt: String
  resetPasswordToken: String
  resetPasswordExpire: String
  token: String
}

type UserDetail {
  name: String
  email: String
  password: String
  _id: ID
  createAt: String
  resetPasswordToken: String
  resetPasswordExpire: String
}

type Query {
  banner: [Banner]
  bannerSingle(id: ID!): Banner
  userDetail: UserDetail
}

type Mutation {
  # createBannerNew(imageLink: Upload!): Banner
  singleUpload(file: Upload!): File!
  createBanner(imageLink: Upload!, status: String): Banner
  deleteBanner(id: ID!): Banner
  updateBanner(id: ID!, imageLink: String!, status: String): Banner
  # Create User Query
  createUser(name: String!, email: String!, password: String!): User
  loginUser(email: String!, password: String!): User
}
`;