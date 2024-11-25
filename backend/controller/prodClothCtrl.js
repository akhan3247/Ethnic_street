const Product = require("../models/productClothes");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//@desc Create Product
//@route POST /api/clothes/create
//@access Private
const createProductClothes = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Get all products
//@route GET /api/clothes/get
//@access Private
 const getProduct = asyncHandler(async (req, res) => {
    try {
        const getAllProduct = await Product.find();
        res.status(200).json(getAllProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Update product
//@route PUT /api/clothes/update/:id
//@access Private
 const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Delete product
//@route DELETE /api/clothes/delete/:id
//@access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Get a single product by ID
//@route GET /api/clothes/:id
//@access Private
const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports ={
    createProductClothes,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};