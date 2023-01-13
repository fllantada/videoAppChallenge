import passport, { AuthenticateOptions } from "passport";
import { Request, Response, NextFunction } from "express";
import { localStrategy } from "./strategies/localStrategy";

//serialize
passport.serializeUser<any, any>((req, user, done) => done(undefined, user));
passport.deserializeUser((user, done) => done(null, user ? user : false));

//passport strategies
passport.use("local-login", localStrategy.login);
passport.use("local-signup", localStrategy.signup);

//passport options
const passportOptions: AuthenticateOptions = { failureMessage: true };

//middleware
export const passportLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local-login", passportOptions, (err, user, info) => {
    user ? res.send(user) : res.send(info);
  })(req, res, next);
};

export const passportSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local-signup", passportOptions, (err, user, info) => {
    user ? res.send(user) : res.send(info);
  })(req, res, next);
};
