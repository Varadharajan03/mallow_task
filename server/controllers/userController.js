const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '' } = req.query;
        
        // Build search filter
        let filter = {};
        if (search) {
            filter = {
                $or: [
                    { first_name: { $regex: search, $options: 'i' } },
                    { last_name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { job_title: { $regex: search, $options: 'i' } },
                    { company: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } },
                    { country: { $regex: search, $options: 'i' } }
                ]
            };
        }
        
        // Calculate pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        // Get total count for pagination
        const total = await User.countDocuments(filter);
        
        // Get paginated users
        const users = await User.find(filter)
            .select('-password')
            .skip(skip)
            .limit(limitNum);
        
        res.json({
            data: users,
            page: pageNum,
            limit: limitNum,
            total: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Private
const nodemailer = require('nodemailer');

const createUser = async (req, res) => {
    const { first_name, last_name, email, password, avatar, phone, job_title, company, city, country, website, bio } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a temporary password if none provided
    const generatedPassword = password && password.trim() !== ''
        ? password
        : Math.random().toString(36).slice(-8) + 'A1!';

    const user = await User.create({
        first_name,
        last_name,
        email,
        password: generatedPassword, // Hashed by pre-save hook
        avatar,
        phone,
        job_title,
        company,
        city,
        country,
        website,
        bio,
    });

    if (!user) {
        return res.status(400).json({ message: 'Invalid user data' });
    }

    // Send welcome email with credentials (configure env for real usage)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Welcome to Mallow Task App',
            text: `Hello ${first_name},\n\nYour account has been created.\nEmail: ${email}\nTemporary Password: ${generatedPassword}\n\nPlease log in and change your password.`,
        });
    } catch (mailErr) {
        // Log mail error but don't block user creation
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;
        res.json(userResponse);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id });

    if (result.deletedCount > 0) {
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

