const express = require("express");
const { createOrder, getOrderById, updateOrderToPaid, getMyOrders, getOrders } = require("../controller/orderCtrl");

const router = express.Router();

router.post('/create', createOrder);    
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);
router.get('/myorders', getMyOrders);
router.get('/', getOrders);

module.exports = router;
