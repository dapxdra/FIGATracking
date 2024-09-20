import express from "express";
import session from "express-session";
import passport from "passport";
import { config } from "dotenv";
import authRoutes from "./routes/auth.js";
import { sequelize } from "./config/config.js";

config();

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(session());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => console.log("Error conectando a la base de datos:", err));
