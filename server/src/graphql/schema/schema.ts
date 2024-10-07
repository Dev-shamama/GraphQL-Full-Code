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

type Query {
  banner: [Banner!]!
  bannerSingle(id: ID!): Banner
}

type Mutation {
  # createBannerNew(imageLink: Upload!): Banner
  singleUpload(file: Upload!): File!
  createBanner(imageLink: Upload!, status: String): Banner
  deleteBanner(id: ID!): Banner
  updateBanner(id: ID!, imageLink: String!, status: String): Banner
}
`;