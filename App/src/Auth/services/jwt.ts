import config from "../../config/config";
import { IUser } from "../models/user";
import jwt from "jsonwebtoken";

export const generateAuthToken = (user: IUser) => {
  const payload = {
    email: user.email,
  };

  const token = jwt.sign(payload, config.TOKEN_SECRET_KEY, {
    expiresIn: "10h",
  });
  return token;
};

export const checkAuthToken = (token: string) => {
  //get the token from the header if present

  const decodeToken = jwt.verify(token, config.TOKEN_SECRET_KEY) as {
    email: string;
  };

  return decodeToken;
};
