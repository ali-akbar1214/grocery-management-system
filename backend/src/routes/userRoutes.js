const express = require('express');
const router = express.Router();
const {
    registerAdmin,
    loginUser,
    getUsers,
    createEmployee,
    getUserById,
    updateUser,
    deleteUser,
    resetPassword,
    updateEmployeeSalesTarget,
} = require('../controllers/userController');
const { protect} = require('../middleware/authMiddleware');
const { admin} = require('../middleware/adminMiddleware');

router.post('/admin/register', registerAdmin);
router.post('/login', loginUser);

router.route('/').get(protect, admin, getUsers);
router.route('/employee').post(protect, admin, createEmployee);
router
    .route('/:id')
    .get(protect, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);
router.route('/:id/reset-password').put(protect, admin, resetPassword);
router.route('/:id/sales-target').put(protect, admin, updateEmployeeSalesTarget);

module.exports = router;
