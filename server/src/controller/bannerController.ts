import Banner from "../model/bannerModel.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
import { getAuthCheck } from "../functions/user.js";
import config from "../config/config.js";
import { finished } from "stream/promises";
const key = config.JWT_SECRET_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Query
export const getAllBanner = async (_: any, __: any, context: any) => {
    // const user = await getAuthCheck(context, true);
    const banners = await Banner.find()
    return banners
}

export const getSingleBanner = async (_: any, { id }: { id: String }) => {
    const banner = await Banner.findById(id)
    return banner
}

// Mutation
export const createBanner = async (_: any, { imageLink, status }: { imageLink: string, status?: string }) => {
    const newBanner = new Banner({
        imageLink,
        status: status || "1",  // Default to "1" if status is not provided
    });
    return await newBanner.save();
}
export const deleteBanner = async (_: any, { id }: { id: String }) => {
    const deleteBanner = await Banner.findByIdAndDelete(id);
    return deleteBanner
}
export const updateBanner = async (_: any, { id, imageLink, status }: { id: String, imageLink: string, status?: string }) => {
    const updateBanner = await Banner.findByIdAndUpdate(id, { imageLink, status }, { new: true })
    return updateBanner
}


// Image Uploads
export const singleUpload = async (_: any, { file }) => {
    const { createReadStream, filename, mimetype, encoding } = await file;
    console.log(file)
    const stream = createReadStream();
    const pathName = path.resolve(__dirname, '../uploads', filename)
    const out = fs.createWriteStream(pathName);

    // Pipe the file stream to the filesystem
    stream.pipe(out);
    await finished(out);

    // Return the file URL (adjust as needed)
    return { url: pathName };
};