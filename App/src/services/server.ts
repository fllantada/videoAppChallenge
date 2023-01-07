import express from "express";
import { Express, Request, Response } from "express";
import mainRouter from "../routes";
import path from "path";
import { createServer } from "http";
import session from "express-session";
import config from "../config/config";
import passport from "passport";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//sessionConfig

//passport config

//user Status for protected Routes

// Static files

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

// engine

app.set("view engine", "pug");

const viewsPath = path.resolve(__dirname, "../views");
app.set("views", viewsPath);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", config.frontOriginAccess);
  next();
});
app.use("/", mainRouter); //mainRouter va aca

app.use(function (err: Error, req: Request, res: Response, next: Function) {
  res.status(500).send({ msg: "Se te rompio todo mira ->", err: err.message });
});

export default createServer(app);
