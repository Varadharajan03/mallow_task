# Mallow Task - Backend API

A robust Node.js/Express backend API for the Mallow React recruitment task, featuring user management with authentication, pagination, and email functionality.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **User Management**: Complete CRUD operations for users
- **Email Integration**: Automated email sending for user registration
- **Data Validation**: Comprehensive input validation and sanitization
- **Pagination**: Efficient pagination with error handling
- **Security**: Password hashing with bcrypt
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer (Gmail)
- **Environment Variables**: dotenv
- **Development**: Nodemon for hot reload
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- Gmail account for email functionality (or other SMTP service)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mallow_task/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the server directory with the following variables:
   ```env
   # Database Configuration
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Email Configuration
   MAIL_USER=your_gmail_address@gmail.com
   MAIL_PASS=your_app_specific_password
   
   # Server Configuration (optional)
   PORT=5000
   ```

4. **Database Setup**
   ```bash
   # Seed the database with sample data
   npm run seed
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
This starts the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## 📁 Project Structure

```
server/
├── controllers/          # Route controllers
│   ├── authController.js  # Authentication logic
│   └── userController.js  # User management logic
├── middleware/           # Custom middleware
│   └── authMiddleware.js # JWT authentication middleware
├── models/              # Mongoose models
│   └── userModel.js     # User schema definition
├── routes/              # Express routes
│   ├── authRoutes.js    # Authentication routes
│   └── userRoutes.js    # User management routes
├── .env                 # Environment variables
├── index.js             # Main server file
├── seed.js              # Database seeding script
└── package.json         # Dependencies and scripts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Users (Protected Routes)
- `GET /api/users` - Get paginated users with search
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Query Parameters for User Listing
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 5, max: 100)
- `search` - Search term for filtering users

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📧 Email Configuration

The application uses Gmail SMTP for sending emails. To set this up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Use your Gmail address as `MAIL_USER`
4. Use the App Password as `MAIL_PASS`

## 🗃️ Database Schema

### User Model
```javascript
{
  first_name: String (required)
  last_name: String (required)
  email: String (required, unique)
  password: String (required, hashed)
  avatar: String (default provided)
  phone: String (optional)
  job_title: String (optional)
  company: String (optional)
  city: String (optional)
  country: String (optional)
  website: String (optional)
  bio: String (optional)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Error Handling**: Detailed error responses without exposing sensitive data

## 📊 Pagination & Error Handling

The API includes robust pagination with automatic error handling:
- Validates page and limit parameters
- Prevents negative skip values that cause BSON errors
- Automatically adjusts pages beyond available data
- Comprehensive error messages for different scenarios

## 🧪 Testing the API

You can test the API using tools like Postman, curl, or the frontend application:

### Example Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Example User Fetch with Pagination
```bash
curl -X GET "http://localhost:5000/api/users?page=1&limit=5&search=john" \
  -H "Authorization: Bearer <your-jwt-token>"
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB URI in the .env file
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check network connectivity

2. **Email Not Sending**
   - Verify Gmail credentials and app password
   - Check that 2FA is enabled on your Gmail account
   - Ensure correct MAIL_USER and MAIL_PASS values

3. **JWT Token Errors**
   - Verify JWT_SECRET is set in environment variables
   - Check token expiration
   - Ensure proper Authorization header format

4. **Pagination Errors**
   - The recent fix handles BSON skip errors automatically
   - Page and limit parameters are validated and sanitized
   - Negative or invalid values are automatically corrected

## 📝 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Populate database with sample data

## 🚀 Deployment

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment:
- `MONGO_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong, unique secret for JWT signing
- `MAIL_USER` & `MAIL_PASS` - Production email credentials



## 📞 Support

For issues and questions:
- Check the troubleshooting section above
- Review the API documentation
- Ensure all environment variables are properly configured

---

**Happy Coding! 🎉**