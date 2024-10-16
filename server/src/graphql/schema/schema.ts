export const schema = `#graphql

scalar DateTime

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
  createAt: DateTime!
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
  # forgetPassword: {success: Int, message: String}
}

type RegisterSchema {
  success: Boolean,
  message: String
  token: String
}

type LoginSchema {
  success: Boolean,
  message: String
  token: String
}

type ForgetPasswordSchema {
  success: Boolean,
  message: String
}
type ResetPasswordSchema {
  success: Boolean,
  message: String
}

type UpdateUserPasswordSchema {
  success: Boolean,
  message: String
}

type Mutation {
  # createBannerNew(imageLink: Upload!): Banner
  singleUpload(file: Upload!): File!
  createBanner(imageLink: Upload!, status: String): Banner
  deleteBanner(id: ID!): Banner
  updateBanner(id: ID!, imageLink: String!, status: String): Banner
  # Create User Query
  createUser(name: String!, email: String!, password: String!): RegisterSchema
  loginUser(email: String!, password: String!): LoginSchema
  forgetPassword(email: String!): ForgetPasswordSchema
  resetPassword(token: String!, password: String!, confirmPassword: String!): ResetPasswordSchema
  updatePassword(oldPassword: String!, newPassword: String!, confirmPassword: String!): UpdateUserPasswordSchema
}
`;