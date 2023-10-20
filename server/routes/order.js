import express from 'express';
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/order.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/all', getOrders);
router.post('/update', updateOrder);
router.delete('/delete/:orderId', deleteOrder);

export default router;