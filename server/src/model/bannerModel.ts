import { Schema, model, Document } from "mongoose";

// Define the interface for the Banner document
interface IBanner extends Document {
  imageLink: string;
  status: string;
  createAt: Date;
}

// Create the schema for Banner
const bannerSchema = new Schema<IBanner>({
  imageLink: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "1", // Changed to string to match the type
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Mongoose model for Banner
const Banner = model<IBanner>("Banner", bannerSchema);

export default Banner;
