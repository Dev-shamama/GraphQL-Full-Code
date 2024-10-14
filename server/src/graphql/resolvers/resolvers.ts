import { createBanner, singleUpload, deleteBanner, getAllBanner, getSingleBanner, updateBanner } from "../../controller/bannerController.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createUser, loginUser, userDetail } from "../../controller/userController.js";
export const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        banner: getAllBanner,
        bannerSingle: getSingleBanner,
        userDetail: userDetail,
    },
    Mutation: {
        createUser: createUser,
        loginUser: loginUser,
        createBanner: createBanner,
        deleteBanner: deleteBanner,
        updateBanner: updateBanner,
        singleUpload: singleUpload,
    },
}