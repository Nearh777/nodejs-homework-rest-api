// import { string } from "joi";
import {Schema, model} from "mongoose";

const contactSchema = new Schema({
    name: String,
    email: String,
    phone: Number,    
    // favorite: False,
});

const Contact = model("contact", contactSchema);

export default Contact;