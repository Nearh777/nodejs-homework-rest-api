import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import jwt from "jsonwebtoken";


const {JWT_SECRET} = process.env;

const signup = async(req, res) => {
  
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(user) {
      throw HttpError(409, "Email in use");
  }
    
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        user: {
          // name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        }
    })
};


const signin = async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user) {
      throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
      
  }

  const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

  res.json({
        token,
         user: {
          // name: newUser.name,
        email: user.email,
        subscription: user.subscription,
        }
    })
}

const getCurrent = (req, res)=> {
  const {name, email, subscription} = req.user;

  res.json({
    // name,
    email,
    subscription,
     
  })
}

const signout = async(req, res)=> {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});
  
  // { message: "Not authorized",}
res.status(204).json()
}

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
};
