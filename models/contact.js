// import { string } from "joi";
import {Schema, model} from "mongoose";
import {phoneRegexp} from "../constants/contact-constants.js";
import { handleSaveError, validateAtUpdate } from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },    
    favorite: {
        type: Boolean,
        match: phoneRegexp,
        default: false,
        
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      }
}, {versionKey: false, timestamps: true});

contactSchema.pre("findOneAndUpdate", validateAtUpdate);
contactSchema.post("save", handleSaveError);
contactSchema.post("findOneAndUpdate", handleSaveError);


const Contact = model("contact", contactSchema);

export default Contact;