const router = require("express").Router();
const protect = require("../middleware/auth.middleware");
const isAdmin = require("../middleware/role.middleware");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  toggleStatus,
} = require("../controllers/admin.controller");

router.use(protect, isAdmin);

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/status", toggleStatus);

module.exports = router;
