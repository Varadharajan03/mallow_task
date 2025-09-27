const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

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
        password: 'cityslicka', 
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

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');
    } catch (err) {
        console.error(`Error connecting to DB: ${err.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await User.deleteMany();

        await User.create(users);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error during data import: ${error}`);
        process.exit(1);
    }
};

const runSeed = async () => {
    await connectDB();
    await importData();
};

runSeed();

