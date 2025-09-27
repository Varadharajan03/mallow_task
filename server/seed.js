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
        phone: '+1-555-0101',
        job_title: 'CEO & Founder',
        company: 'StatusCode Weekly',
        city: 'San Francisco',
        country: 'United States',
        website: 'https://statuscode.com',
        bio: 'Passionate about building scalable web applications and leading innovative teams. Over 15 years of experience in tech industry with expertise in full-stack development and business strategy.',
    },
    {
        first_name: 'Janet',
        last_name: 'Weaver',
        email: 'janet.weaver@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
        phone: '+1-555-0102',
        job_title: 'Senior Frontend Developer',
        company: 'React Innovations Inc.',
        city: 'Austin',
        country: 'United States',
        website: 'https://janetweaver.dev',
        bio: 'Frontend specialist with a passion for creating beautiful, accessible user interfaces. Expert in React, TypeScript, and modern CSS frameworks. Love mentoring junior developers.',
    },
    {
        first_name: 'Emma',
        last_name: 'Wong',
        email: 'emma.wong@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/3-image.jpg',
        phone: '+1-555-0103',
        job_title: 'UX/UI Designer',
        company: 'Design Studio Pro',
        city: 'Seattle',
        country: 'United States',
        website: 'https://emmawong.design',
        bio: 'Creative designer focused on user-centered design principles. Specialized in mobile-first design, prototyping, and user research. Winner of multiple design awards.',
    },
    {
        first_name: 'Eve',
        last_name: 'Holt',
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
        avatar: 'https://reqres.in/img/faces/4-image.jpg',
        phone: '+44-20-7946-0958',
        job_title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        city: 'London',
        country: 'United Kingdom',
        website: 'https://eveholt.tech',
        bio: 'Infrastructure enthusiast with expertise in AWS, Docker, and Kubernetes. Passionate about automation, CI/CD pipelines, and building reliable, scalable systems.',
    },
    {
        first_name: 'Charles',
        last_name: 'Morris',
        email: 'charles.morris@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/5-image.jpg',
        phone: '+1-555-0105',
        job_title: 'Backend Developer',
        company: 'Database Dynamics',
        city: 'New York',
        country: 'United States',
        website: 'https://charlesmorris.dev',
        bio: 'Backend specialist with deep knowledge of Node.js, Python, and database architecture. Love optimizing performance and building robust APIs that scale.',
    },
    {
        first_name: 'Tracey',
        last_name: 'Ramos',
        email: 'tracey.ramos@reqres.in',
        password: 'password123',
        avatar: 'https://reqres.in/img/faces/6-image.jpg',
        phone: '+1-555-0106',
        job_title: 'Product Manager',
        company: 'Innovation Labs',
        city: 'Los Angeles',
        country: 'United States',
        website: 'https://traceyramos.pm',
        bio: 'Strategic product manager with a track record of launching successful digital products. Expert in agile methodologies, user research, and cross-functional team leadership.',
    },
    {
        first_name: 'Michael',
        last_name: 'Johnson',
        email: 'michael.johnson@techcorp.com',
        password: 'securepass456',
        avatar: 'https://reqres.in/img/faces/7-image.jpg',
        phone: '+1-555-0107',
        job_title: 'Full Stack Developer',
        company: 'TechCorp Solutions',
        city: 'Denver',
        country: 'United States',
        website: 'https://michaeljdev.com',
        bio: 'Versatile full-stack developer proficient in React, Node.js, and MongoDB. Enjoy tackling complex problems and building end-to-end solutions from concept to deployment.',
    },
    {
        first_name: 'Sarah',
        last_name: 'Chen',
        email: 'sarah.chen@aitech.io',
        password: 'aipower789',
        avatar: 'https://reqres.in/img/faces/8-image.jpg',
        phone: '+1-555-0108',
        job_title: 'AI/ML Engineer',
        company: 'AI Technologies Inc.',
        city: 'Palo Alto',
        country: 'United States',
        website: 'https://sarahchen.ai',
        bio: 'Machine learning engineer specializing in natural language processing and computer vision. PhD in Computer Science with focus on deep learning architectures.',
    },
    {
        first_name: 'David',
        last_name: 'Rodriguez',
        email: 'david.rodriguez@securetech.com',
        password: 'cybersafe321',
        avatar: 'https://reqres.in/img/faces/9-image.jpg',
        phone: '+1-555-0109',
        job_title: 'Cybersecurity Analyst',
        company: 'SecureTech Global',
        city: 'Miami',
        country: 'United States',
        website: 'https://davidrodriguez.security',
        bio: 'Cybersecurity expert with over 10 years protecting organizations from digital threats. Specialized in penetration testing, security auditing, and incident response.',
    },
    {
        first_name: 'Lisa',
        last_name: 'Taylor',
        email: 'lisa.taylor@mobilefirst.ca',
        password: 'mobiledev654',
        avatar: 'https://reqres.in/img/faces/10-image.jpg',
        phone: '+1-416-555-0110',
        job_title: 'Mobile App Developer',
        company: 'Mobile First Studios',
        city: 'Toronto',
        country: 'Canada',
        website: 'https://lisataylor.mobile',
        bio: 'Mobile development expert skilled in iOS (Swift) and Android (Kotlin) development. Published 12+ apps on app stores with millions of downloads combined.',
    },
    {
        first_name: 'James',
        last_name: 'Wilson',
        email: 'james.wilson@dataanalytics.com',
        password: 'datamaster987',
        avatar: 'https://reqres.in/img/faces/11-image.jpg',
        phone: '+1-555-0111',
        job_title: 'Data Scientist',
        company: 'Analytics Pro',
        city: 'Chicago',
        country: 'United States',
        website: 'https://jameswilson.data',
        bio: 'Data scientist with expertise in statistical modeling, machine learning, and data visualization. Help businesses make data-driven decisions through advanced analytics.',
    },
    {
        first_name: 'Maria',
        last_name: 'Garcia',
        email: 'maria.garcia@cloudservices.es',
        password: 'cloudexpert456',
        avatar: 'https://reqres.in/img/faces/12-image.jpg',
        phone: '+34-91-555-0112',
        job_title: 'Cloud Architect',
        company: 'European Cloud Services',
        city: 'Madrid',
        country: 'Spain',
        website: 'https://mariagarcia.cloud',
        bio: 'Cloud architecture specialist with extensive experience in AWS, Azure, and GCP. Design and implement scalable, secure cloud solutions for enterprise clients.',
    },
    {
        first_name: 'Alex',
        last_name: 'Kim',
        email: 'alex.kim@gamedev.kr',
        password: 'gamedev123',
        avatar: 'https://reqres.in/img/faces/13-image.jpg',
        phone: '+82-2-555-0113',
        job_title: 'Game Developer',
        company: 'Seoul Game Studios',
        city: 'Seoul',
        country: 'South Korea',
        website: 'https://alexkim.games',
        bio: 'Passionate game developer with 8+ years creating immersive gaming experiences. Expert in Unity, Unreal Engine, and mobile game optimization.',
    },
    {
        first_name: 'Sophie',
        last_name: 'Anderson',
        email: 'sophie.anderson@blockchain.au',
        password: 'blockchain789',
        avatar: 'https://reqres.in/img/faces/14-image.jpg',
        phone: '+61-2-555-0114',
        job_title: 'Blockchain Developer',
        company: 'Australian Blockchain Solutions',
        city: 'Sydney',
        country: 'Australia',
        website: 'https://sophieanderson.blockchain',
        bio: 'Blockchain developer specializing in smart contracts, DeFi protocols, and cryptocurrency systems. Early adopter and contributor to multiple open-source blockchain projects.',
    },
    {
        first_name: 'Ryan',
        last_name: 'Murphy',
        email: 'ryan.murphy@qatech.ie',
        password: 'qualitytest321',
        avatar: 'https://reqres.in/img/faces/15-image.jpg',
        phone: '+353-1-555-0115',
        job_title: 'QA Engineer',
        company: 'Quality Assurance Technologies',
        city: 'Dublin',
        country: 'Ireland',
        website: 'https://ryanmurphy.qa',
        bio: 'Quality assurance engineer with expertise in automated testing, performance testing, and test-driven development. Ensure software reliability and user satisfaction.',
    }
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

