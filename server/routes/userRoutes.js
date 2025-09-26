const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.route('/').get(protect, getUsers).post(protect, createUser);
router
    .route('/:id')
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router;

