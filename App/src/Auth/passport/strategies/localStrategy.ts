import { Request } from "express";
import {
  IStrategyOptionsWithRequest,
  Strategy as LocalStrategy,
  VerifyFunctionWithRequest,
} from "passport-local";
import passport from "passport";
import { UserModel } from "../../models/user";

const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const signUp: VerifyFunctionWithRequest = async (
  req: Request,
  username,
  password,
  done
) => {
  const user = await UserModel.find({ email: username });

  if (user.length) {
    return done(null, false, {
      message: "User already exists2!!!",
    });
  }

  const newUser = new UserModel({
    email: username,
    password: password,
  });

  await newUser.save();

  return done(null, newUser);
};

const verifyLogin: VerifyFunctionWithRequest = async (
  req: Request,
  username,
  password,
  done
) => {
  const user = await UserModel.find({ email: username });

  if (!user.length) {
    return done(null, false, {
      message: "User not found",
    });
  }
  return done(null, user);
};

const login = new LocalStrategy(strategyOptions, verifyLogin);
const signup = new LocalStrategy(strategyOptions, signUp);

export const localStrategy = { login, signup };
