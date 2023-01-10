import server from "./services/server";
import mongoConnection from "./services/mongoConextion";
import { PopularVideosApp } from "./VideoApp/aplication/PopularVideosApp";
import { MongoRepository } from "./VideoApp/infrastructure/Mongo.repository";
import config from "./config/config";

const PORT = process.env.PORT || 8080;

//conect to DB

mongoConnection();
//turn on server

server.listen(PORT, () => {
  console.log(`Server is running on url http://localhost:${PORT}`);
});

//turn on videoApp

const videoApp = new PopularVideosApp(new MongoRepository());

export default videoApp;
