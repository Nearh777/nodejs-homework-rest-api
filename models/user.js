import { Schema, model } from "mongoose";
import { handleSaveError, validateAtUpdate } from "./hooks.js";
import { emailRegexp } from "../constants/user-constants.js";


const userSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlenth: 7,
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
userSchema.post("save", handleSaveError);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;