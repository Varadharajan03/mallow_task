const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

// Load environment variables from your .env file
dotenv.config();

// The initial list of users to be added to the database
const users = [
    {
        first_name: 'George',
        last_name: 'Bluth',
        email: 'george.bluth@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/1-image.jpg',
    },
    {
        first_name: 'Janet',
        last_name: 'Weaver',
        email: 'janet.weaver@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
    },
    {
        first_name: 'Emma',
        last_name: 'Wong',
        email: 'emma.wong@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/3-image.jpg',
    },
    {
        first_name: 'Eve',
        last_name: 'Holt',
        email: 'eve.holt@reqres.in',
        password: 'cityslicka', // The specific password for the test login user
        avatar: 'https://reqres.in/img/faces/4-image.jpg',
    },
    {
        first_name: 'Charles',
        last_name: 'Morris',
        email: 'charles.morris@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/5-image.jpg',
    },
    {
        first_name: 'Tracey',
        last_name: 'Ramos',
        email: 'tracey.ramos@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/6-image.jpg',
    },
];

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');
    } catch (err) {
        console.error(`Error connecting to DB: ${err.message}`);
        process.exit(1); // Exit with failure
    }
};

// Function to import the data
const importData = async () => {
    try {
        // 1. Clear any existing users to prevent duplicates
        await User.deleteMany();

        // 2. Insert the new users. The 'pre-save' hook in userModel.js
        // will automatically and securely hash the passwords before they are stored.
        await User.create(users);

        console.log('Data Imported Successfully!');
        process.exit(); // Exit with success
    } catch (error) {
        console.error(`Error during data import: ${error}`);
        process.exit(1); // Exit with failure
    }
};

// Main function to run the seeding process
const runSeed = async () => {
    await connectDB();
    await importData();
};

runSeed();

