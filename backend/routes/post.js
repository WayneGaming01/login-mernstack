const { Router } = require("express");
const form = require("../controller/form");
const router = Router();

router.post("/auth/login", form.login)

router.post("/auth/signup", form.signup)

router.post("/form/contact", form.contact)

module.exports = router;