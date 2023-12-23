const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const session = require('express-session');
const passport = require("passport");


// las importciones de las rutas
const usersRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(session({
  secret: '5D7453DAB5897C85EA1B9F2DE6D5A', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' } // 'auto' para HTTPS/HTTP según sea necesario
}));


app.use(passport.initialize());
app.use(passport.session())

require('./config/passport')(passport)
app.use(cors());
app.disable("x-powered-by");

app.set("port", port);
// llamados de las rutas
usersRoutes(app);

server.listen(3000, "192.168.0.15" || "localhost", function () {
  console.log("Aplicacion de Rogans " + process.pid + " iniciada...");
});

app.get("/", (req, res) => {
  res.send("rutas de pruebas");
});

app.get("/test", (req, res) => {
  res.send("Ruta de test iniciada");
});

// manejo de errores
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});
