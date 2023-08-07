import { Schema, model } from "mongoose";
import { hendleSaveError, validateAtUpdate } from "./hooks.js";
import { emailRegexp } from "../constants/user-constants.js";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
      }
}, { versionKey: false, timestamps: true });



userSchema.pre("findOneAndUpdate", validateAtUpdate);
userSchema.post("save", hendleSaveError);
userSchema.post("findOneAndUpdate", hendleSaveError);

const User = model("user", userSchema);

export default User;