const express = require('express');
const router = express.Router();
const { createSale, processReturn, getSalesAnalysis, getEmployeeSales, getDashboardSummary, generateMonthlySalesReport, generateBill, getEmployeeBills } = require('../controllers/saleController');
const { protect} = require('../middleware/authMiddleware');
const { admin} = require('../middleware/adminMiddleware');

router.route('/').post(protect, createSale);
router.route('/return').post(protect, processReturn);
router.route('/analysis').get(protect, admin, getSalesAnalysis);
// Allow employees to fetch their own sales; admin can fetch any
router.route('/employee/:id').get(protect, getEmployeeSales);
router.route('/summary').get(protect, admin, getDashboardSummary);
router.route('/report/monthly').get(protect, admin, generateMonthlySalesReport);
router.route('/:id/bill').post(protect, generateBill);
// Allow employees to fetch their own bills; admin can fetch any
router.route('/employee/:id/bills').get(protect, getEmployeeBills);

module.exports = router;
