const router = require("express").Router();
const passport = require("../config/passport");

const {
  registerUser,
  loginUser,
  adminLogin,
} = require("../controllers/auth.controller");

// local register/login
router.post("/register", registerUser);
router.post("/login", loginUser);

// admin login
router.post("/admin-login", adminLogin);

// google auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    res.json({
      message: "Google login success",
      token: req.user.token,
      user: req.user,
    });
  }
);

module.exports = router;
