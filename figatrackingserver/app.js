const express = require("express");
const session = require("express-session");
const passport = require("passport");
//const passport = require("./controllers/authController.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const usuarioRoutes = require("./routes/usuarios.js");
const vehiculosRoutes = require("./routes/vehiculos.js");
const sequelize = require("./config/sequelize.js");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // Expira en 1 día
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.get("/logout", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use("/logout", authRoutes);
app.use(authRoutes);

app.use("/usuarios", usuarioRoutes);
app.use("/vehiculos", vehiculosRoutes);
// Servir archivos estáticos desde la carpeta build de React
app.use(express.static(path.resolve(__dirname, "../figatrackingclient/build")));

// Manejar todas las rutas y devolver index.html para que React Router funcione
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../figatrackingclient/build", "index.html")
  );
});

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.log("Error conectando a la base de datos:", err));
