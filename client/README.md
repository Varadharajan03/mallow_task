# Mallow Task - Frontend Client

A modern, responsive React frontend application for user management, built with TypeScript, Redux Toolkit, and Tailwind CSS. Features a beautiful UI with card/list views, real-time search, and comprehensive user management capabilities.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **User Authentication**: Secure login/logout with JWT tokens
- **User Management**: Complete CRUD operations for users
- **Dual View Modes**: Switch between card and list views
- **Real-time Search**: Debounced search with instant feedback
- **Smart Pagination**: Efficient pagination with user-friendly navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **State Management**: Redux Toolkit for predictable state management
- **Type Safety**: Full TypeScript implementation
- **Email Integration**: User creation with automatic email notifications

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite (ultra-fast development and building)
- **State Management**: Redux Toolkit with React-Redux
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS with custom components
- **HTTP Client**: Axios for API communication
- **Type Checking**: TypeScript for type safety
- **Linting**: ESLint with React-specific rules

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server running (see server README.md)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mallow_task/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the client directory (optional):
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Mallow Task Manager
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will open at `http://localhost:5173` by default.

## 🚀 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── api/               # API configuration
│   │   └── axios.ts       # Axios setup and interceptors
│   ├── app/               # Redux store and app-level configs
│   │   ├── hooks.ts       # Custom Redux hooks
│   │   └── store.ts       # Redux store configuration
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Common components
│   │   │   ├── ConfirmationModal.tsx
│   │   │   └── Loader.tsx
│   │   └── users/         # User-specific components
│   │       ├── UserCard.tsx
│   │       ├── UserListItem.tsx
│   │       └── UserModal.tsx
│   ├── features/          # Redux slices and features
│   │   ├── auth/          # Authentication logic
│   │   │   └── authSlice.ts
│   │   └── users/         # User management logic
│   │       └── usersSlice.ts
│   ├── pages/             # Page components
│   │   ├── Login.tsx
│   │   └── Users.tsx
│   ├── router/            # Routing configuration
│   │   └── AppRouter.tsx
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles and Tailwind imports
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 UI Components

### UserCard
- **Flip Animation**: 3D card flip effect on hover
- **Avatar Display**: User profile images with fallbacks
- **Responsive Design**: Adapts to different screen sizes
- **Action Buttons**: Edit and delete functionality

### UserListItem
- **Clean Layout**: Minimalist list design
- **Quick Actions**: Inline edit and delete buttons
- **Information Display**: All user details in organized format

### UserModal
- **Form Validation**: Real-time form validation
- **Create/Edit Modes**: Single modal for both operations
- **Responsive**: Works on all device sizes

## 🔐 Authentication Flow

1. **Login Process**
   - User enters credentials
   - JWT token received and stored
   - Automatic redirect to dashboard
   - Token included in all API requests

2. **Protected Routes**
   - Automatic redirect to login if not authenticated
   - Token validation on app initialization
   - Logout functionality clears tokens

3. **Token Management**
   - Secure token storage in localStorage
   - Axios interceptors for token injection

## 🎯 State Management

### Redux Store Structure
```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isLoading: boolean,
    error: string | null
  },
  users: {
    users: User[],
    isLoading: boolean,
    error: string | null,
    page: number,
    limit: number,
    total: number
  }
}
```

### Async Actions
- `fetchUsers` - Paginated user fetching with search
- `createUser` - Create new user with email notification
- `updateUser` - Update existing user information
- `deleteUser` - Remove user from system
- `loginUser` - User authentication
- `logoutUser` - User logout

## 🔍 Search & Pagination

### Smart Search
- **Debounced Input**: 500ms delay for optimal performance
- **Real-time Feedback**: Loading states and result counts
- **Multi-field Search**: Searches across name, email, job, company, etc.
- **Search Reset**: Easy clear functionality

### Pagination Features
- **Page Navigation**: Previous/Next buttons with disable states
- **Page Indicators**: Current page and total pages display
- **Auto-adjustment**: Handles invalid page numbers gracefully

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px - Optimized touch interfaces
- **Tablet**: 640px - 1024px - Balanced layout
- **Desktop**: > 1024px - Full feature set

### Mobile Optimizations
- **Touch-friendly Buttons**: Larger tap targets
- **Simplified Navigation**: Collapsed menus and streamlined UI
- **Optimized Modals**: Full-screen on small devices

## 🎨 Styling & Theming

### Design System
- **Color Palette**: Warm amber and orange gradients
- **Typography**: Modern, readable font stack
- **Shadows**: Subtle depth with CSS box-shadows
- **Animations**: Smooth transitions and micro-interactions

## 🚨 Error Handling

### User-Friendly Errors
- **Network Errors**: Graceful handling of connection issues
- **Validation Errors**: Clear field-level error messages
- **Server Errors**: Informative error displays
- **Loading States**: Skeleton screens and spinners

## 🔧 Configuration

### API Configuration
```typescript
// src/api/axios.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Request/Response interceptors
// Authentication token injection
// Error response handling
```

### Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Mallow Task Manager
VITE_VERSION=1.0.0
```

## 📈 Performance Optimizations

### Current Optimizations
- **Code Splitting**: Lazy loading with React.lazy()
- **Image Optimization**: WebP format with fallbacks
- **Bundle Optimization**: Vite's automatic optimizations
- **State Updates**: Efficient Redux patterns

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```
Creates optimized files in the `dist/` directory.

### Deployment Options

#### Static Hosting
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment from Git
- **GitHub Pages**: Free hosting for public repos

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **API Connection Issues**
   - Verify backend server is running
   - Check CORS configuration
   - Verify API endpoints in axios config

3. **State Management Issues**
   - Check Redux DevTools for state changes
   - Verify action dispatching
   - Check async thunk error handling




---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
