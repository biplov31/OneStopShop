import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/product.js';

const router = express.Router();

router.post('/create', createProduct);
router.get('/all', getProducts);
router.post('/update', updateProduct);
router.delete('/delete/:productId', deleteProduct);

export default router;