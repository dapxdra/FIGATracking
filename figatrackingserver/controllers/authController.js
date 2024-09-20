import { User } from "../models/user.js";
import { sign } from "jsonwebtoken";

export async function googleAuth(req, res) {
  const { id, emails } = req.user;

  try {
    let user = await User.findOne({ where: { googleId: id } });

    if (!user) {
      user = await User.create({
        googleId: id,
        email: emails[0].value,
      });
    }

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en la autenticación con Google" });
  }
}
