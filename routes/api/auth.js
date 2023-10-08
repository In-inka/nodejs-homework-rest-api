const express = require("express");
const {
  validateBodyCreate,
  authenticate,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post(
  "/register",
  validateBodyCreate(schemas.registerSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post(
  "/verify",
  validateBodyCreate(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBodyCreate(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/", authenticate, ctrl.getUpdate);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);
module.exports = router;
