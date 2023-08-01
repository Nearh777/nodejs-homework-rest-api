// import { string } from "joi";
import {Schema, model} from "mongoose";
import {phoneRegexp} from "../constants/contact-constants.js";
import { hendleSaveError } from "./hooks.js";

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
        type: Number,
        required: true,
    },    
    favorite: {
        type: Boolean,
        match: phoneRegexp,
        default: false,
        
    },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", hendleSaveError);


const Contact = model("contact", contactSchema);

export default Contact;