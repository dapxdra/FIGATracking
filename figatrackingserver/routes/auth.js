import { Router } from "express";
import { authenticate } from "passport";
const router = Router();
import { googleAuth } from "../controllers/authController.js";

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/google", authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  authenticate("google", { session: false, failureRedirect: "/login" }),
  googleAuth
);

export default router;
