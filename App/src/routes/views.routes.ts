import { Router } from "express";

const views = Router();

views.get("/", (req, res) => {
  res.render("./pages/homePage.pug", { title: "Home" });
});

export default views;
