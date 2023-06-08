const { Router } = require("express");
const router = Router();
const auth = require("../controller/auth");
const form = require("../controller/form");

router.post("/auth/login", auth.login);

router.post("/auth/signup", auth.signup);

router.post("/auth/usercode", auth.usercode);

router.post("/form/ticket", form.ticket);

module.exports = router;
