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

type ViewMode = 'list' | 'card';

const Users = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users, isLoading, error, page, limit, total } = useAppSelector((state) => state.users);
    const authUser = useAppSelector((state) => state.auth.user);

    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage, limit: itemsPerPage, search: searchTerm }));
    }, [dispatch, currentPage, itemsPerPage, searchTerm]);

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
    
    return (
        <div className="min-h-screen app-gradient p-4 md:p-8">
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

            <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span className="text-gray-600">Welcome, {authUser?.first_name}</span>
                    <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                        Logout
                    </button>
                </div>
            </header>

            <div className="bg-white p-6 rounded-2xl shadow-xl animate-scale-in">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset page on search
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 border border-gray-300 rounded-md p-1">
                            <button onClick={() => setViewMode('list')} className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : ''}`}>List</button>
                            <button onClick={() => setViewMode('card')} className={`px-3 py-1 rounded ${viewMode === 'card' ? 'bg-indigo-600 text-white' : ''}`}>Card</button>
                        </div>
                        <button onClick={handleCreate} className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                            Add User
                        </button>
                    </div>
                </div>

                {isLoading && users.length === 0 ? (
                    <div className="flex justify-center items-center h-64"><Loader /></div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        {viewMode === 'list' ? (
                            <div className="overflow-x-auto animate-fade-in-up">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map(user => (
                                            <UserListItem key={user._id} user={user} onEdit={handleEdit} onDelete={handleDeleteClick} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                                {users.map(user => (
                                    <UserCard key={user._id} user={user} onEdit={handleEdit} onDelete={handleDeleteClick} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6">
                            <span className="text-sm text-gray-700">
                                Showing {users.length > 0 ? (page - 1) * (limit || itemsPerPage) + 1 : 0} to {(page - 1) * (limit || itemsPerPage) + users.length} of {total} results
                            </span>
                            <div className="flex space-x-1">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50">Prev</button>
                                {[...Array(totalPages).keys()].map(num => (
                                    <button key={num + 1} onClick={() => setCurrentPage(num + 1)} className={`px-3 py-1 border rounded-md ${currentPage === num + 1 ? 'bg-indigo-600 text-white' : ''}`}>
                                        {num + 1}
                                    </button>
                                ))}
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50">Next</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Users;

