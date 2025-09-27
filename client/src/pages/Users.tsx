

// Updated Users Component
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers, deleteUser } from '../features/users/usersSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/users/UserCard';
import UserListItem from '../components/users/UserListItem';
import UserModal from '../components/users/UserModal';
import ConfirmationModal from '../components/common/ConfirmationModal';
import Loader from '../components/common/Loader';
import type { User } from '../types';
import { useDebounce } from '../app/hooks';

type ViewMode = 'list' | 'card';

const Users = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users, isLoading, error, limit, total } = useAppSelector((state) => state.users);
    const authUser = useAppSelector((state) => state.auth.user);

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const itemsPerPage = 5;

    // Debounce search term with 500ms delay
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Track if we're currently searching
    const isSearching = searchTerm !== debouncedSearchTerm;

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: itemsPerPage, search: debouncedSearchTerm }));
        setIsInitialLoad(false);
    }, [dispatch, currentPage, itemsPerPage, debouncedSearchTerm]);

    // Reset to page 1 when search term changes
    useEffect(() => {
        if (debouncedSearchTerm !== searchTerm) {
            setCurrentPage(1);
        }
    }, [searchTerm]);

    const totalPages = Math.ceil(total / (limit || itemsPerPage));

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setUserModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setUserModalOpen(true);
    };

    const handleDeleteClick = (userId: string) => {
        setUserToDelete(userId);
        setConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            dispatch(deleteUser(userToDelete));
        }
        setConfirmModalOpen(false);
        setUserToDelete(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        // Reset to page 1 immediately when user starts typing
        setCurrentPage(1);
    };

    const getViewModeIcon = (mode: ViewMode) => {
        if (mode === 'list') {
            return (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
            );
        }
        return (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        );
    };

    // Only show blur effect during initial load or when no users exist
    const shouldShowBlur = isLoading && (isInitialLoad || users.length === 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 flex flex-col">
            {/* Modals */}
            <UserModal
                isOpen={isUserModalOpen}
                onClose={() => setUserModalOpen(false)}
                user={selectedUser}
            />
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this user?"
            />

            {/* Header */}
            <header className="flex-shrink-0 p-4 md:p-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100 p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                        <div className="flex items-center space-x-3 mb-3 lg:mb-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-1a5 5 0 00-5-5H7a5 5 0 00-5 5v1h5m5-7a4 4 0 100-8 4 4 0 000 8z"
                                        />
                                    </svg>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    Users Management
                                </h1>
                                <p className="text-gray-600 text-sm hidden md:block">Manage your team members</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 bg-white/60 rounded-lg px-3 py-2 border border-amber-200">
                                <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-semibold">
                                        {authUser?.first_name?.charAt(0)}{authUser?.last_name?.charAt(0)}
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-xs text-gray-600">{authUser?.first_name} {authUser?.last_name}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium flex items-center space-x-2"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 mx-4 md:mx-6 mb-4 md:mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-100 overflow-hidden flex flex-col">
                {/* Controls Bar */}
                <div className="flex-shrink-0 bg-amber-50 p-4 border-b border-amber-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-3">
                        {/* Search Section */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    {isSearching ? (
                                        <svg className="h-4 w-4 text-amber-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    ) : (
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 border border-amber-200 rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent 
             transition-colors duration-200 placeholder-gray-500"
                                />

                                {searchTerm && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setCurrentPage(1);
                                        }}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            {isSearching && (
                                <p className="text-xs text-amber-600 mt-1 ml-1">Searching...</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-3 w-full sm:w-auto">
                            {/* Pagination Navigation */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 text-gray-600"
                                    title="Previous page"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-amber-700 bg-white px-3 py-1 rounded-lg border border-amber-200">
                                        {currentPage}
                                    </span>
                                    <span className="text-sm text-gray-500">/</span>
                                    <span className="text-sm text-gray-600">{totalPages}</span>
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 bg-white border border-amber-200 rounded-lg hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 text-gray-600"
                                    title="Next page"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Stats Badge */}
                            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-amber-200">
                                <div className={`w-2 h-2 rounded-full ${isSearching ? 'bg-amber-400' : 'bg-green-400'}`}></div>
                                <span>Total: {total}</span>
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex items-center bg-white rounded-lg p-1 border border-amber-200 gap-2">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded transition-colors duration-200 ${viewMode === 'list'
                                        ? 'bg-amber-500 text-white'
                                        : 'text-gray-600 hover:text-amber-600'
                                        }`}
                                    title="List view"
                                >
                                    {getViewModeIcon('list')}
                                </button>

                                <button
                                    onClick={() => setViewMode('card')}
                                    className={`p-2 rounded transition-colors duration-200 ${viewMode === 'card'
                                        ? 'bg-amber-500 text-white'
                                        : 'text-gray-600 hover:text-amber-600'
                                        }`}
                                    title="Grid view"
                                >
                                    {getViewModeIcon('card')}
                                </button>
                            </div>

                            {/* Add User Button */}
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-200 font-medium flex items-center space-x-2"
                                title="Add new user"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="hidden sm:inline">Add User</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area - Flexible height */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {isLoading && users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <Loader />
                            <p className="text-gray-500 font-medium">Loading users...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-red-600 font-medium">Something went wrong</p>
                                <p className="text-gray-500 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-600 font-medium">No users found</p>
                                <p className="text-gray-500 text-sm mt-1">
                                    {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first user'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={`transition-opacity duration-300 ${shouldShowBlur ? 'opacity-50' : 'opacity-100'}`}>
                            {viewMode === 'list' ? (
                                <div className="space-y-4">
                                    {users.map((user) => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            onEdit={handleEdit}
                                            onDelete={handleDeleteClick}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {users.map((user) => (
                                        <UserCard
                                            key={user._id}
                                            user={user}
                                            onEdit={handleEdit}
                                            onDelete={handleDeleteClick}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;