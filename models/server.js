const cors = require("cors");
const express = require("express");
class Server {
  constructor() {
    this.app = express();

    //Middlewares --> funciones que añaden funcionalidad al webserver
    this.middlewares();
    //Rutas de mi App
    this.routes();
    this.userPath = "/api/user";
    //Puerto
    this.port = process.env.PORT;
  }

  middlewares() {
    //cors
    this.app.use(cors());
    //directorio publico
    this.app.use(express.static("public"));
    //lectura y parceo del body
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/api/user", require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App corriendo en el puerto : ", this.port);
    });
  }
}

module.exports = Server;
