import Joi from "joi";
import {phoneRegexp} from "../constants/contact-constants.js";

const contactsAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
        
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required email field`,
        
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "any.required": `missing required phone field`,
        
    }),
    favorite: Joi.boolean(),
    
        
    
})

export default {
    contactsAddSchema,
}


