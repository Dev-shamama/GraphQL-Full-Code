import { createBanner, singleUpload, deleteBanner, getAllBanner, getSingleBanner, updateBanner } from "../../controller/bannerController.js";
export const resolvers = {
    Query: {
        banner: getAllBanner,
        bannerSingle: getSingleBanner
    },
    Mutation: {
        createBanner: createBanner,
        deleteBanner: deleteBanner,
        updateBanner: updateBanner,
        singleUpload: singleUpload,
    },
    
}