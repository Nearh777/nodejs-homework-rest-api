import Joi from "joi";
import { emailRegexp } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const updateBySubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required()
});


export default {
    userSignupSchema,
    userSigninSchema,
    updateBySubscriptionSchema,
}