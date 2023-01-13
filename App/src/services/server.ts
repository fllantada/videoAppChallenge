import express from "express";
import { Express, Request, Response } from "express";
import mainRouter from "../routes";
import path from "path";
import { createServer } from "http";
import session from "express-session";
import config from "../config/config";
import passport from "passport";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//sessionConfig standard

app.use(session(config.sessionConfig));

//passport config

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("serializeUser  aaaaa", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializeUser    aaaaaaaaaaa", user);
  user ? done(null, user) : done(null, false);
});

//user Status for protected Routes

// Static files

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

//security cors policy
app.use(cors(config.corsOptions));

//routes
app.use("/", mainRouter); //mainRouter va aca

// Error handler
app.use(function (err: Error, req: Request, res: Response, next: Function) {
  res.status(500).send({ msg: "Se te rompio todo mira ->", err: err.message });
});

export default createServer(app);
