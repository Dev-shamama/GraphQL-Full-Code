import User from "../model/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {getAuthCheck} from "../function/user.js";
const key = "my-secret-key"

export const createUser = async (_: any, { name, email, password }: { name: String, email: String, password: String }) => {
    const user = await User.create({
        name,
        email,
        password,
    });
    user.password = undefined;
    const token = jwt.sign({ user }, key)
    return { success: true, message: "Account create successfully", token };
}

export const loginUser = async (_: any, { email, password }: { email: String, password: any }) => {

    if (!email || !password) {
        throw new Error("Email and Password was wrong!")
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid email and password")
    }
    const isPasswordMatched = bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid email and password")
    }

    user.password = undefined;

    const token = jwt.sign({ id: user._id }, key)
    return { success: true, message: "Login successfully", token };
}

export const userDetail = async (_: any, parameter: any, context: any) => {
    const user = await getAuthCheck(context, true);
    return user
}