import jwt from "jsonwebtoken";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import Contact from "../models/contact.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await Contact.findById(id)
    if (!user || !user.token) {
        throw HttpError(401); 
    }
    req.user = user;
    next();
  } catch (error) {
    throw HttpError(401, error.message);
  }
};

export default ctrlWrapper(authenticate);
