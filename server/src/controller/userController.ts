import User from "../model/userModel.js"
import { getAuthCheck, jwtToken } from "../functions/user.js";
import sendEmail from "../utils/sendEmail.js";
import { AuthenticationError, UserInputError } from 'apollo-server-express'; // Example from Apollo
import crypto from "crypto";


// User Register
export const createUser = async (_: any, { name, email, password }: { name: string, email: string, password: string }) => {
    const user = await User.create({
        name,
        email,
        password,
    });
    user.password = undefined;
    const token = jwtToken(user);
    return { success: true, message: "Account create successfully", token };
}

// User Login
export const loginUser = async (_: any, args: any, context: any) => {
    const { email, password } = args;
    // Validate if email and password are provided
    if (!email || !password) {
        throw new UserInputError("Please enter a valid email and password");
    }

    // Fetch user by email, including the password
    const user = await User.findOne({ email }).select("+password");

    // If user is not found
    if (!user) {
        throw new AuthenticationError("Invalid email or password");
    }

    // Check if the provided password matches the user's password
    const isPasswordMatched = await user.comparePassword(password);
    console.log(isPasswordMatched);

    // If password doesn't match
    if (!isPasswordMatched) {
        throw new AuthenticationError("Invalid email or password");
    }

    // Optional: Exclude password from the response
    user.password = undefined;

    const token = user.jwtAuthToken();

    return {
        success: true,
        message: "Login successful",
        token
    };
};

// User Detail
export const userDetail = async (_: any, parameter: any, context: any) => {
    const user = await getAuthCheck(context, true);
    return user
}

// User Forget Password
export const forgetPassword = async (_: any, { email }: { email: string }, context: any) => {
    const user = await User.findOne({ email });
    try {
        if (!user) {
            throw new UserInputError("User not found", { email });
        }

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const frontEndUrl = process.env.FRONTEND_URL;
        const resetPasswordUrl = `${frontEndUrl}/password/reset/${resetToken}`;

        const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, please ignore it.`;

        await sendEmail({
            email: user.email,
            subject: "Games.com Password Recovery",
            message: message,
        });

        return {
            success: true,
            message: `Email sent to ${user.email} successfully`,
        };
    } catch (e) {
        console.log(e);
        // Reset token and expiration in case of an error
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
    }
}

// User Reset Password After Email Verified
export const resetPassword = async (_: any, args: any, context: any) => {
    const { token, password, confirmPassword } = args;

    // Create token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    // Check if user exists and token is valid
    if (!user) {
        throw new UserInputError("Reset Password token is invalid or has expired");
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        throw new UserInputError("Passwords do not match");
    }

    // Update the user's password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return {
        success: true,
        message: "Password reset successfully",
    };
};

// User Update Password
export const updatePassword = async (_: any, args: any, context: any) => {
    const userReq = await getAuthCheck(context, true);

    const { oldPassword, newPassword, confirmPassword } = args;

    // Fetch user by ID (assuming user ID is available in the context, such as from JWT)
    const user = await User.findById(userReq._id).select("+password");

    // Check if the old password is correct
    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
        throw new AuthenticationError("Old Password is incorrect");
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
        throw new UserInputError("New password and confirmation password do not match");
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    return {
        success: true,
        message: "Password updated successfully",
    };
};