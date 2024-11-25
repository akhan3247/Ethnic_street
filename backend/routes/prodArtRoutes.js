const express = require("express");
const {
    createProductArt,
    getArt,
    checkRoute,
    getArtById,
    updateArt,
    deleteArt,

} = require("../controller/prodArtCtrl");

const router = express.Router();

router.post('/create', createProductArt);
router.get('/get', getArt);
router.get('/check', checkRoute);
router.get('/:id', getArtById);
router.put('/:id', updateArt);
router.delete('/:id', deleteArt);

module.exports = router;