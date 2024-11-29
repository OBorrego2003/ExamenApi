import express from 'express';
import { addProduct, editProduct, deleteProduct, viewStock, viewSoldProducts,deleteAllProducts } from '../controllers/adminController';
import isAdmin from '../middleware/authMiddleware';
import { someAdminAction } from '../controllers/adminController';

const router = express.Router();

router.post('/products',isAdmin, addProduct);
router.put('/products/:id',isAdmin, editProduct);
router.delete('/products/:id',isAdmin, deleteProduct);
router.get('/stock',isAdmin, viewStock);
router.get('/sold-products',isAdmin, viewSoldProducts);
router.delete('/delete-all-products',isAdmin, deleteAllProducts);
router.post('/admin-action', isAdmin, someAdminAction);
export default router;
