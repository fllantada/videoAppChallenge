import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import { checkAuthToken } from "../services/jwt";

export const protectedRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get the token from the header if present
  const token: string = req.headers["event-auth-token"] as string;

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decode = checkAuthToken(token);
    const user = await UserModel.find({ email: decode.email });

    if (!user) return res.status(400).json({ msg: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
