import { createBanner, singleUpload, deleteBanner, getAllBanner, getSingleBanner, updateBanner } from "../../controller/bannerController.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import { createUser, forgetPassword, loginUser, resetPassword, updatePassword, userDetail } from "../../controller/userController.js";
export const resolvers = {
    Upload: GraphQLUpload,
    Query: {
        // User
        userDetail: userDetail,
        // Banner
        banner: getAllBanner,
        bannerSingle: getSingleBanner,
    },
    Mutation: {
        // User
        createUser: createUser,
        loginUser: loginUser,
        forgetPassword: forgetPassword,
        resetPassword: resetPassword,
        updatePassword: updatePassword,
        // Banner
        createBanner: createBanner,
        deleteBanner: deleteBanner,
        updateBanner: updateBanner,
        singleUpload: singleUpload,
    },
}