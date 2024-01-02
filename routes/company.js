const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {addCompany, getCompanies, getLastCompanies, deleteCompany, editCompany} = require('../controllers/company');

router.post("/add", auth, addCompany);
router.get("/", auth, getCompanies);
router.get("/last", auth, getLastCompanies);
router.delete("/:id", auth, deleteCompany);
router.post("/edit/:id",auth, editCompany);
module.exports = router;