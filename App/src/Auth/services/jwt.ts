import config from "../../config/config";
import { IUser, UserModel } from "../models/user";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const generateAuthToken = (user: IUser) => {
  const payload = {
    email: user.email,
  };

  const token = jwt.sign(payload, config.TOKEN_SECRET_KEY, {
    expiresIn: "10h",
  });
  return token;
};

export const checkAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get the token from the header if present
  const token: string = req.headers["event-auth-token"] as string;

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decode = jwt.verify(token, config.TOKEN_SECRET_KEY) as {
      email: string;
    };
    console.log("TOKEN DECODIFICADO");
    console.log(decode);

    const user = await UserModel.find({ email: decode.email });

    if (!user) return res.status(400).json({ msg: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
