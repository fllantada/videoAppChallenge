import server from "./services/server";
import mongoConnection from "./services/mongoConextion";

const PORT = process.env.PORT || 8080;

//conect to mongo

//turn on server
server.listen(PORT, () => {
  console.log(`Server is running on url http://localhost:${PORT}`);
});
