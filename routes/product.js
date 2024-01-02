const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {addProduct, getProducts, deleteProduct, editProduct} = require('../controllers/product');

router.post("/add", auth, addProduct);
router.get("/", auth,  getProducts);
router.delete("/:id", auth, deleteProduct);
router.post("/edit/:id", auth, editProduct);

module.exports = router;