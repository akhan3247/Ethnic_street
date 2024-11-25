const Art = require("../models/productArt");
const asyncHandler = require("express-async-handler");

//@desc Create a new Art entry
//@route POST /api/art/create
//@access Private
const createProductArt = asyncHandler(async (req, res) => {
    try {
        if (!req.body.title || !req.body.description || !req.body.price) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const newArt = await Art.create(req.body);
        res.status(201).json({
            success: true,
            data: newArt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Get all art products with optional filtering and sorting
//@route GET /api/art/get
//@access Private
const getArt = asyncHandler(async (req, res) => {
    try {
        const { sort, price, title } = req.query;
        let query = Art.find();

        // Filter by price range if provided
        if (price) {
            const [min, max] = price.split("-");
            query = query.where('price').gte(min).lte(max);
        }

        // Filter by title if provided
        if (title) {
            query = query.where('title', new RegExp(title, 'i'));
        }

        // Sort if specified
        if (sort) {
            query = query.sort(sort);
        }

        const getAllArt = await query.exec();
        res.status(200).json({
            success: true,
            count: getAllArt.length,
            data: getAllArt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Get single art product by ID
//@route GET /api/art/:id
//@access Private
const getArtById = asyncHandler(async (req, res) => {
    try {
        const art = await Art.findById(req.params.id);
        if (!art) {
            return res.status(404).json({ message: "Art not found" });
        }
        res.status(200).json({
            success: true,
            data: art
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Update art product
//@route PUT /api/art/update/:id
//@access Private
const updateArt = asyncHandler(async (req, res) => {
    try {
        const art = await Art.findById(req.params.id);
        if (!art) {
            return res.status(404).json({ message: "Art not found" });
        }

        const updatedArt = await Art.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedArt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//@desc Delete art product
//@route DELETE /api/art/delete/:id
//@access Private
const deleteArt = asyncHandler(async (req, res) => {
    try {
        const art = await Art.findById(req.params.id);
        if (!art) {
            return res.status(404).json({ message: "Art not found" });
        }

        await art.remove();
        res.status(200).json({
            success: true,
            message: "Art successfully deleted"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    createProductArt,
    getArt,
    getArtById,
    updateArt,
    deleteArt
};