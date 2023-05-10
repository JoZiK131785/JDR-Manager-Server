const { 
    registerUser,
    loginUser,
} = require("../controllers/User");

const router = require("express").Router();
const auth = require("../utils/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/free-endpoint", (request, response) => {
    response.json({ message: "You are free to access me anytime" });
});
router.get("/auth-endpoint", auth, (request, response) => {
response.json({ message: "You are authorized to access me" });
});

module.exports = router;