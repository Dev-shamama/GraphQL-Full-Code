import config from "../config/config.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

const key = config.JWT_SECRET_KEY;

interface JwtPayload {
    id: string
}
// User Auth ==> Checking  
export const getAuthCheck = async (request: { token: any; }, requireAuth = false) => {
    const token = request.token;
    if (!token) {
        throw new Error("Please login to access this resource");
    }
    try {
        const { id } = jwt.verify(token, key) as JwtPayload;
        const user = await User.findById(id);
        if (!user) {
            throw new Error("Invalid token, user not valid");
        }
        if (requireAuth == false) {
            return null;
        }
        return user;
    } catch (error) {
        return null
    }
}

export const jwtToken = (user: { _id: any; }) => {
    return jwt.sign({ id: user._id }, key);
}
