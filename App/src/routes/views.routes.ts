import { Router } from "express";

const views = Router();

views.get("/", (req, res) => {
  res.render("./pages/homePage.pug", { title: "Home Challenge " });
});

views.get("/popular", (req, res) => {
  res.render("./pages/popularPage.pug", {
    data: [
      { id: 1, title: "Card 1", description: "Description for card 1" },
      { id: 2, title: "Card 2", description: "Description for card 2" },
      { id: 3, title: "Card 3", description: "Description for card 3" },
    ],
  });
});

export default views;
