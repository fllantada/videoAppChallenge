import { Request, Response } from "express";

import { IUser, UserModel } from "src/Auth/models/user";
import { generateAuthToken } from "src/Auth/services/jwt";

export default {
  healthCheck: async (req: Request, res: Response) => {
    res.status(200).json("ok");
  },

  login: async (req: Request, res: Response) => {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const checkPassword = await user.isValidPassword(password);

    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateAuthToken(user as IUser);

    res.header("x-auth-token", token).json({ msg: "login OK", token });

    /*  if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password" });
    } */
  },
};
