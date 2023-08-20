import bcrypt from "bcryptjs";
import User from "../models/user.js";
import path from "path";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import Jimp from "jimp";


const {JWT_SECRET} = process.env;

const avatarPath = path.resolve("public", "avatars");


const signup = async(req, res) => {
  
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(user) {
      throw HttpError(409, "Email in use");
  }
    
  const hashPassword = await bcrypt.hash(password, 10);
  const urlAvatar = gravatar.url(email);

  const newUser = await User.create({...req.body, email, password: hashPassword, subscription, avatarURL: urlAvatar });

    res.status(201).json({
        user: {
          // name: newUser.name,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
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

const updateByAvatar = async(req, res, next) => {
  const { _id } = req.user;
   const {path: oldPath, filename} = req.file;
    const newPath = path.join(avatarPath, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

    const image = await Jimp.read(oldPath);
        await image.resize(250, 250)
             .writeAsync(oldPath);
             await fs.rename(oldPath, avatar);
        const avatarURL = path.join('avatars', filename);
        const user = await User.findByIdAndUpdate(_id, { avatarURL });
         if (!user) {
            throw RequestError(401, "Not authorized");
        }

        res.json({
            avatarURL: user.avatarURL,
        })

   

} 

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateByAvatar: ctrlWrapper(updateByAvatar),
};
