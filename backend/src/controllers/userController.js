const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new admin
// @route   POST /api/users/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
    const { name, username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        username,
        password,
        role: 'admin',
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt for username:', username);
    console.log('Password provided:', password);

    const user = await User.findOne({ username });

    if (user) {
        console.log('User found:', user.username);
        const isMatch = await user.matchPassword(password);
        console.log('Password match result:', isMatch);

        if (isMatch) {
            res.json({
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error('Invalid username or password');
        }
    } else {
        console.log('User not found for username:', username);
        res.status(401);
        throw new Error('Invalid username or password');
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
};

// @desc    Create a new employee
// @route   POST /api/users/employee
// @access  Private/Admin
const createEmployee = async (req, res) => {
    const { name, username, password, monthlySalesTarget } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        username,
        password,
        role: 'employee',
        monthlySalesTarget,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            role: user.role,
            monthlySalesTarget: user.monthlySalesTarget,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Authorization: allow if admin or requesting own data
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
        res.status(401);
        throw new Error('Not authorized to view this user');
    }

    res.json(user);
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        // Update fields only when provided (allow 0 values for numeric fields)
        if (req.body.name !== undefined) user.name = req.body.name;
        if (req.body.username !== undefined) user.username = req.body.username;
        if (req.body.monthlySalesTarget !== undefined) user.monthlySalesTarget = Number(req.body.monthlySalesTarget);
        // Password update should be handled separately or with extra care

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            role: updatedUser.role,
            monthlySalesTarget: updatedUser.monthlySalesTarget,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne(); // Changed from user.remove() as it's deprecated
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Reset user password
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
const resetPassword = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.password = req.body.password; // New password

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            message: 'Password reset successfully',
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update employee monthly sales target
// @route   PUT /api/users/:id/sales-target
// @access  Private/Admin
const updateEmployeeSalesTarget = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.role !== 'employee') {
            res.status(400);
            throw new Error('Can only set sales target for employees');
        }
        // Accept numeric 0 values; cast to Number when provided
        if (req.body.monthlySalesTarget === undefined) {
            res.status(400);
            throw new Error('monthlySalesTarget is required');
        }
        user.monthlySalesTarget = Number(req.body.monthlySalesTarget);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            role: updatedUser.role,
            monthlySalesTarget: updatedUser.monthlySalesTarget,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = {
    registerAdmin,
    loginUser,
    getUsers,
    createEmployee,
    getUserById,
    updateUser,
    deleteUser,
    resetPassword,
    updateEmployeeSalesTarget,
};
