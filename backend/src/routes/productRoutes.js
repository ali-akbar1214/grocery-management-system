const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getInventoryAlerts,
    generateInventoryReport,
} = require('../controllers/productController');
const { protect} = require('../middleware/authMiddleware');
const { admin} = require('../middleware/adminMiddleware');

router.route('/').post(protect, admin, createProduct).get(protect, getProducts);
// Specific routes first so they aren't captured by the '/:id' parameter route
router.route('/alerts').get(protect, admin, getInventoryAlerts);
router.route('/report').get(protect, admin, generateInventoryReport);

router
    .route('/:id')
    .get(protect, getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
