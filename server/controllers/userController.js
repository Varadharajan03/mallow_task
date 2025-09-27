const User = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 5, search = '' } = req.query;
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
        
        // Validate and sanitize pagination parameters
        let pageNum = parseInt(page);
        let limitNum = parseInt(limit);
        
        // Ensure page is at least 1
        if (isNaN(pageNum) || pageNum < 1) {
            pageNum = 1;
        }
        
        // Ensure limit is between 1 and 100 (reasonable bounds)
        if (isNaN(limitNum) || limitNum < 1) {
            limitNum = 5;
        } else if (limitNum > 100) {
            limitNum = 100;
        }
        
        // Calculate skip, ensuring it's never negative
        const skip = Math.max(0, (pageNum - 1) * limitNum);
        
        const total = await User.countDocuments(filter);
        
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

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};


const nodemailer = require('nodemailer');

const createUser = async (req, res) => {
    const { first_name, last_name, email, password, avatar, phone, job_title, company, city, country, website, bio } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const generatedPassword = password && password.trim() !== ''
        ? password
        : Math.random().toString(36).slice(-8) + 'A1!';

    const user = await User.create({
        first_name,
        last_name,
        email,
        password: generatedPassword, 
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
        console.error('Error sending email:', mailErr);
    }

    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json(userResponse);
};
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

