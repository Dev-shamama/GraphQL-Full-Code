import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js"

// Define the interface for the Banner document
interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    createAt: Date;
    resetPasswordToken?: string,
    resetPasswordExpire?: Date;

    // Methods
    jwtAuthToken(): string;
    comparePassword(enteredPassword: string): Promise<boolean>;
    getResetPasswordToken(): string;
}

// Create the schema for Banner
const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceeds 30 characters"],
        minLength: [4, "Name should be at least 4 characters long"],
    },

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Name should be at least 8 characters long"],
        select: false,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.jwtAuthToken = function () {
    return jwt.sign({ id: this._id }, config.JWT_SECRET_KEY, {
        expiresIn: "10d",
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    const isPassword = await bcrypt.compare(enteredPassword, this.password);
    return isPassword;
};

// Generating Password Reset Token

userSchema.methods.getResetPasswordToken = function (): string {
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    // Set expire time
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  
    return resetToken;
  };

// userSchema.methods.getResetPasswordToken = async function () {
//     // Generating Token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // Hashing and Adding resetPasswordToken to userSchema
//     this.resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex");

//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken;
// };

// Create the Mongoose model for User
const User = model<IUser>("User", userSchema);

export default User;
