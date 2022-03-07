const cors = require("cors");
const express = require("express");
const {dbConnection} = require("../database/config");
const fileUpload = require("express-fileupload");
class Server {
  constructor() {
    this.app = express();

    //Middlewares --> funciones que añaden funcionalidad al webserver
    this.middlewares();
    //Rutas de mi App
    this.path = {
      userPath: "/api/user",
      buscarPath: "/api/buscar",
      authPath: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      uploads: "/api/uploads",
    };
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
    //carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  routes() {
    this.app.use(this.path.userPath, require("../routes/user"));
    this.app.use(this.path.authPath, require("../routes/auth"));
    this.app.use(this.path.buscarPath, require("../routes/buscar"));
    this.app.use(this.path.categorias, require("../routes/categorias"));
    this.app.use(this.path.productos, require("../routes/productos"));
    this.app.use(this.path.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("App corriendo en el puerto : ", this.port);
    });
  }
}

module.exports = Server;
