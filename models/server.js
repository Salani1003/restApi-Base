const cors = require("cors");
const express = require("express");
const {dbConnection} = require("../database/config");
class Server {
  constructor() {
    this.app = express();

    //Middlewares --> funciones que añaden funcionalidad al webserver
    this.middlewares();
    //Rutas de mi App
    this.userPath = "/api/user";
    this.authPath = "/api/auth";
    this.routes();

    //Conectar a base de datos
    this.conectarDB();
    //Puerto
    this.port = process.env.PORT;
  }

  async conectarDB() {
    await dbConnection();
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
    this.app.use(this.userPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App corriendo en el puerto : ", this.port);
    });
  }
}

module.exports = Server;
