const express = require("express");

const {
    createProductClothes,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} = require("../controller/prodClothCtrl");

const router = express.Router();

router.post("/", createProductClothes);
router.get("/:id", getProductById);
router.get("/", getProduct);
router.post("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = router;