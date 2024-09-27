const express = require("express");
const session = require("express-session");
const passport = require("passport");
//const passport = require("./controllers/authController.js");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const sequelize = require("./config/sequelize.js");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

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
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use(authRoutes);

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
